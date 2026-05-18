import { useState, useEffect, useCallback } from "react";

const LIKES_KEY = "dish_likes";
const LIKED_KEY = "dish_liked_by_user";
const PROMOS_KEY = "dish_promos";
const PROMO_DURATION_MS = 60 * 60 * 1000; // 1 hour

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, val: unknown) {
  localStorage.setItem(key, JSON.stringify(val));
}

export interface PromoInfo {
  dishId: string;
  dishName: string;
  activatedAt: number;
  expiresAt: number;
}

export function getAllDishIds(allItems: { name: string }[]): { id: string; name: string }[] {
  return allItems.map((item) => ({ id: slugify(item.name), name: item.name }));
}

export function useLikes(allDishNames: string[]) {
  const [likes, setLikes] = useState<Record<string, number>>(() => readJson(LIKES_KEY, {}));
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>(() => readJson(LIKED_KEY, {}));
  const [promos, setPromos] = useState<Record<string, { activatedAt: number; dishName: string }>>(() => readJson(PROMOS_KEY, {}));

  // Sync from localStorage (cross-tab / cross-page)
  useEffect(() => {
    const sync = () => {
      setLikes(readJson(LIKES_KEY, {}));
      setUserLiked(readJson(LIKED_KEY, {}));
      setPromos(readJson(PROMOS_KEY, {}));
    };
    window.addEventListener("storage", sync);
    // Also poll every 2s for same-tab updates from demo page
    const interval = setInterval(sync, 2000);
    return () => {
      window.removeEventListener("storage", sync);
      clearInterval(interval);
    };
  }, []);

  // Check promo expiration every second
  useEffect(() => {
    const interval = setInterval(() => {
      const currentPromos = readJson<Record<string, { activatedAt: number; dishName: string }>>(PROMOS_KEY, {});
      let changed = false;
      const now = Date.now();
      for (const [dishId, promo] of Object.entries(currentPromos)) {
        if (now - promo.activatedAt >= PROMO_DURATION_MS) {
          // Expire: reset likes for this dish, remove promo
          const currentLikes = readJson<Record<string, number>>(LIKES_KEY, {});
          currentLikes[dishId] = 0;
          writeJson(LIKES_KEY, currentLikes);
          delete currentPromos[dishId];
          changed = true;
        }
      }
      if (changed) {
        writeJson(PROMOS_KEY, currentPromos);
        setPromos({ ...currentPromos });
        setLikes(readJson(LIKES_KEY, {}));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getDishId = useCallback((name: string) => slugify(name), []);

  const toggleLike = useCallback((dishName: string) => {
    const dishId = slugify(dishName);
    const currentLiked = readJson<Record<string, boolean>>(LIKED_KEY, {});
    const currentLikes = readJson<Record<string, number>>(LIKES_KEY, {});

    if (currentLiked[dishId]) {
      // Unlike
      const newCount = Math.max(0, (currentLikes[dishId] || 0) - 1);
      currentLikes[dishId] = newCount;
      delete currentLiked[dishId];
      writeJson(LIKES_KEY, currentLikes);
      writeJson(LIKED_KEY, currentLiked);
      setLikes({ ...currentLikes });
      setUserLiked({ ...currentLiked });
    } else {
      // Like
      const newCount = (currentLikes[dishId] || 0) + 1;
      currentLikes[dishId] = newCount;
      currentLiked[dishId] = true;
      writeJson(LIKES_KEY, currentLikes);
      writeJson(LIKED_KEY, currentLiked);
      setLikes({ ...currentLikes });
      setUserLiked({ ...currentLiked });

      // Check if hit 100
      if (newCount >= 100) {
        const currentPromos = readJson<Record<string, { activatedAt: number; dishName: string }>>(PROMOS_KEY, {});
        if (!currentPromos[dishId]) {
          currentPromos[dishId] = { activatedAt: Date.now(), dishName };
          writeJson(PROMOS_KEY, currentPromos);
          setPromos({ ...currentPromos });
        }
      }
    }
  }, []);

  const triggerPromo = useCallback((dishName: string) => {
    const dishId = slugify(dishName);
    const currentLikes = readJson<Record<string, number>>(LIKES_KEY, {});
    currentLikes[dishId] = 100;
    writeJson(LIKES_KEY, currentLikes);

    const currentPromos = readJson<Record<string, { activatedAt: number; dishName: string }>>(PROMOS_KEY, {});
    currentPromos[dishId] = { activatedAt: Date.now(), dishName };
    writeJson(PROMOS_KEY, currentPromos);

    setLikes({ ...currentLikes });
    setPromos({ ...currentPromos });
  }, []);

  const resetAll = useCallback(() => {
    writeJson(LIKES_KEY, {});
    writeJson(LIKED_KEY, {});
    writeJson(PROMOS_KEY, {});
    setLikes({});
    setUserLiked({});
    setPromos({});
  }, []);

  const getLikeCount = useCallback((dishName: string) => {
    return likes[slugify(dishName)] || 0;
  }, [likes]);

  const isLikedByUser = useCallback((dishName: string) => {
    return !!userLiked[slugify(dishName)];
  }, [userLiked]);

  const getActivePromo = useCallback((dishName: string): PromoInfo | null => {
    const dishId = slugify(dishName);
    const promo = promos[dishId];
    if (!promo) return null;
    const expiresAt = promo.activatedAt + PROMO_DURATION_MS;
    if (Date.now() >= expiresAt) return null;
    return { dishId, dishName: promo.dishName, activatedAt: promo.activatedAt, expiresAt };
  }, [promos]);

  const getAllActivePromos = useCallback((): PromoInfo[] => {
    const now = Date.now();
    return Object.entries(promos)
      .filter(([, p]) => now < p.activatedAt + PROMO_DURATION_MS)
      .map(([dishId, p]) => ({
        dishId,
        dishName: p.dishName,
        activatedAt: p.activatedAt,
        expiresAt: p.activatedAt + PROMO_DURATION_MS,
      }));
  }, [promos]);

  return {
    likes,
    getLikeCount,
    isLikedByUser,
    toggleLike,
    getActivePromo,
    getAllActivePromos,
    triggerPromo,
    resetAll,
    getDishId,
  };
}

export function formatCountdown(expiresAt: number): string {
  const remaining = Math.max(0, expiresAt - Date.now());
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function getDiscountedPrice(priceStr: string): string {
  const num = parseFloat(priceStr.replace("€", "").replace(",", "."));
  if (isNaN(num)) return priceStr;
  const discounted = (num / 2).toFixed(2).replace(".00", "").replace(/\.50$/, ".50");
  return `${discounted}€`;
}
