import { useEffect } from "react";

export default function InterestForm() {
  useEffect(() => {
    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const container = document.querySelector(".slide-form-container");

    const handleSignIn = () => {
      container?.classList.remove("right-panel-active");
    };

    const handleSignUp = () => {
      container?.classList.add("right-panel-active");
    };

    signInBtn?.addEventListener("click", handleSignIn);
    signUpBtn?.addEventListener("click", handleSignUp);

    // Form submission preventDefault
    const firstForm = document.getElementById("form1");
    const secondForm = document.getElementById("form2");
    
    const preventSubmit = (e: Event) => e.preventDefault();
    firstForm?.addEventListener("submit", preventSubmit);
    secondForm?.addEventListener("submit", preventSubmit);

    return () => {
      signInBtn?.removeEventListener("click", handleSignIn);
      signUpBtn?.removeEventListener("click", handleSignUp);
      firstForm?.removeEventListener("submit", preventSubmit);
      secondForm?.removeEventListener("submit", preventSubmit);
    };
  }, []);

  return (
    <section id="interesse" className="interest-section">
      <div className="slide-form-container right-panel-active">
        {/* Sign Up */}
        <div className="form-container form-signup">
          <form className="form" id="form1">
            <h2 className="form__title">Sign Up</h2>
            <input type="text" placeholder="User" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button className="btn">Sign Up</button>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container form-signin">
          <form className="form" id="form2">
            <h2 className="form__title">Sign In</h2>
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <a href="#" className="link">Forgot your password?</a>
            <button className="btn">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay__panel overlay--left">
              <button className="btn" id="signIn">Sign In</button>
            </div>
            <div className="overlay__panel overlay--right">
              <button className="btn" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .interest-section {
          align-items: center;
          background-color: #e9e9e9;
          background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg");
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          display: grid;
          padding: 80px 20px;
          place-items: center;
        }

        .slide-form-container {
          /* COLORS */
          --white: #e9e9e9;
          --gray: #333;
          --blue: #0367a6;
          --lightblue: #008997;

          /* RADII */
          --button-radius: 0.7rem;

          /* SIZES */
          --max-width: 758px;
          --max-height: 420px;

          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

          background-color: var(--white);
          border-radius: var(--button-radius);
          box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
            0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
          height: var(--max-height);
          max-width: var(--max-width);
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .slide-form-container .form__title {
          font-weight: 300;
          margin: 0;
          margin-bottom: 1.25rem;
          color: #333;
        }

        .slide-form-container .link {
          color: var(--gray);
          font-size: 0.9rem;
          margin: 1.5rem 0;
          text-decoration: none;
        }

        .slide-form-container .form-container {
          height: 100%;
          position: absolute;
          top: 0;
          transition: all 0.6s ease-in-out;
        }

        .slide-form-container .form-signin {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .slide-form-container.right-panel-active .form-signin {
          transform: translateX(100%);
        }

        .slide-form-container .form-signup {
          left: 0;
          opacity: 0;
          width: 50%;
          z-index: 1;
        }

        .slide-form-container.right-panel-active .form-signup {
          animation: show 0.6s;
          opacity: 1;
          transform: translateX(100%);
          z-index: 5;
        }

        .slide-form-container .overlay-container {
          height: 100%;
          left: 50%;
          overflow: hidden;
          position: absolute;
          top: 0;
          transition: transform 0.6s ease-in-out;
          width: 50%;
          z-index: 100;
        }

        .slide-form-container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .slide-form-container .overlay {
          background-color: var(--lightblue);
          background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg");
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          height: 100%;
          left: -100%;
          position: relative;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
          width: 200%;
        }

        .slide-form-container.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .slide-form-container .overlay__panel {
          align-items: center;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          position: absolute;
          text-align: center;
          top: 0;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
          width: 50%;
        }

        .slide-form-container .overlay--left {
          transform: translateX(-20%);
        }

        .slide-form-container.right-panel-active .overlay--left {
          transform: translateX(0);
        }

        .slide-form-container .overlay--right {
          right: 0;
          transform: translateX(0);
        }

        .slide-form-container.right-panel-active .overlay--right {
          transform: translateX(20%);
        }

        .slide-form-container .btn {
          background-color: var(--blue);
          background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
          border-radius: 20px;
          border: 1px solid var(--blue);
          color: #ffffff;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: bold;
          letter-spacing: 0.1rem;
          padding: 0.9rem 4rem;
          text-transform: uppercase;
          transition: transform 80ms ease-in;
        }

        .slide-form-container .form > .btn {
          margin-top: 1.5rem;
        }

        .slide-form-container .btn:active {
          transform: scale(0.95);
        }

        .slide-form-container .btn:focus {
          outline: none;
        }

        .slide-form-container .form {
          background-color: #fafaf8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 3rem;
          height: 100%;
          text-align: center;
        }

        .slide-form-container .input {
          background-color: #e9e9e9;
          border: none;
          padding: 0.9rem 0.9rem;
          margin: 0.5rem 0;
          width: 100%;
          outline: none;
          color: #333;
        }

        @keyframes show {
          0%,
          49.99% {
            opacity: 0;
            z-index: 1;
          }

          50%,
          100% {
            opacity: 1;
            z-index: 5;
          }
        }
      `}</style>
    </section>
  );
}
