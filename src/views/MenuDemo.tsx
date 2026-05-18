import { useState, useEffect } from "react";
import { useLikes, formatCountdown } from "@/hooks/useLikes";

// All dish names from the menu
const allDishNames = [
  "Burrata & Prosciutto", "Polpetti al Sugo", "Polpette della Nonna",
  "La San Marzano", "La Gustosa", "Crudo e Ricotta Salata", "La Carciofa",
  "Tagliere di Salumi", "Tagliere di Formaggi", "Tagliere Misto",
  "Zuppa del Giorno",
  "Pomodoro D.O.P", "Bolognese Ragù", "Carbonara", "Quattro Formaggi",
  "Tartufata", "Pesto Genovese", "Pasticciata", "Amatriciana",
  "Paccheri del Pescatore", "Ravioli Porcini Guanciale", "Ravioli Ricotta Spinaci",
  "Cannelloni", "Lasagna", "Gnocchi Sorrentina",
  "Molise", "Torino", "Milano", "Parma", "Romana", "Napoli", "Calabrese", "Bologna",
  "Cotoletta di Maiale", "Pollo alla Cacciatora", "Scaloppina ai Funghi",
  "Insalata Mista", "Mediterranea", "La Bufala",
  "Tiramisù", "Affogato al Caffè", "Dolce della Casa",
];

const MenuDemoPage = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("demo_auth") === "true");
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [selectedDish, setSelectedDish] = useState(allDishNames[0]);
  const { likes, getLikeCount, getAllActivePromos, triggerPromo, resetAll, getDishId } = useLikes(allDishNames);
  const [, setTick] = useState(0);

  // Force re-render every second for countdown
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, []);

  const handleLogin = () => {
    if (pw === "lali2024") {
      sessionStorage.setItem("demo_auth", "true");
      setAuthed(true);
    } else {
      setPwError(true);
    }
  };

  const activePromos = getAllActivePromos();

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#2c1a0e", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#3a2518", borderRadius: 12, padding: "48px 36px", maxWidth: 360, width: "100%", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#BF8A3D", marginBottom: 24 }}>ðŸ”’ Access Required</h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter password"
            style={{
              width: "100%", padding: "12px 16px", border: `1px solid ${pwError ? "#b54a2a" : "#BF8A3D40"}`,
              borderRadius: 6, background: "#2c1a0e", color: "#dfc99a",
              fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", outline: "none", marginBottom: 12,
            }}
          />
          {pwError && <p style={{ color: "#b54a2a", fontSize: "0.8rem", marginBottom: 12 }}>Wrong password</p>}
          <button
            onClick={handleLogin}
            style={{
              width: "100%", padding: "12px", border: "1px solid #BF8A3D", borderRadius: 6,
              background: "#BF8A3D", color: "#2c1a0e", fontFamily: "'Lato', sans-serif",
              fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#2c1a0e", color: "#dfc99a", padding: "32px 20px 60px", fontFamily: "'Lato', sans-serif" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#BF8A3D", textAlign: "center", marginBottom: 8 }}>
          ðŸŽ›ï¸ Promo Demo Panel
        </h1>
        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#dfc99a80", letterSpacing: "0.1em", marginBottom: 32 }}>
          LALIMENTARI · Internal Tool
        </p>

        {/* Controls */}
        <div style={{ background: "#3a2518", borderRadius: 10, padding: "24px 20px", marginBottom: 24 }}>
          <label style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#BF8A3D", marginBottom: 8, display: "block" }}>
            Select Dish
          </label>
          <select
            value={selectedDish}
            onChange={(e) => setSelectedDish(e.target.value)}
            style={{
              width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #BF8A3D40",
              background: "#2c1a0e", color: "#dfc99a", fontFamily: "'Lato', sans-serif", fontSize: "0.85rem",
              marginBottom: 16, outline: "none",
            }}
          >
            {allDishNames.map((name) => (
              <option key={name} value={name}>{name} ({getLikeCount(name)} â¤ï¸)</option>
            ))}
          </select>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => triggerPromo(selectedDish)}
              style={{
                flex: 1, padding: "12px", border: "none", borderRadius: 6,
                background: "#BF8A3D", color: "#2c1a0e", fontWeight: 700,
                fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              }}
            >
              â­ Trigger 100 Likes Promo
            </button>
            <button
              onClick={resetAll}
              style={{
                flex: 1, padding: "12px", border: "1px solid #b54a2a", borderRadius: 6,
                background: "transparent", color: "#b54a2a", fontWeight: 700,
                fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              }}
            >
              Reset All Likes
            </button>
          </div>
        </div>

        {/* Active Promos */}
        {activePromos.length > 0 && (
          <div style={{ background: "#3a2518", borderRadius: 10, padding: "20px", marginBottom: 24, border: "1px solid #BF8A3D40" }}>
            <h3 style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#BF8A3D", marginBottom: 12 }}>
              ðŸ”¥ Active Promos
            </h3>
            {activePromos.map((p) => (
              <div key={p.dishId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #ffffff10" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem" }}>â­ {p.dishName}</span>
                <span style={{ fontSize: "0.85rem", color: "#BF8A3D", fontFamily: "monospace" }}>{formatCountdown(p.expiresAt)}</span>
              </div>
            ))}
          </div>
        )}

        {/* All dishes table */}
        <div style={{ background: "#3a2518", borderRadius: 10, padding: "20px", overflow: "hidden" }}>
          <h3 style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#BF8A3D", marginBottom: 16 }}>
            All Dishes — Like Progress
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {allDishNames.map((name) => {
              const count = getLikeCount(name);
              const pct = Math.min(100, (count / 100) * 100);
              const isPromo = activePromos.some((p) => p.dishName === name);
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.8rem", minWidth: 160, color: isPromo ? "#BF8A3D" : "#dfc99a" }}>
                    {isPromo ? "â­ " : ""}{name}
                  </span>
                  <div style={{ flex: 1, height: 6, background: "#ffffff10", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 3, transition: "width 0.6s ease",
                      width: `${pct}%`,
                      background: isPromo ? "#BF8A3D" : "#8b1a0a",
                    }} />
                  </div>
                  <span style={{ fontSize: "0.75rem", color: isPromo ? "#BF8A3D" : "#dfc99a80", minWidth: 30, textAlign: "right" }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDemoPage;
