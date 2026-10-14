import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="ap-footer">
      <div className="ap-container ap-footer-content">
        <div>
          <Link to="/" className="ap-footer-logo">
            ask<span>pakistan</span> ✦
          </Link>
          <p>
            Making Pakistan's public information easier to understand and
            navigate.
          </p>
          <p className="ap-disclaimer">
            An independent information project. Not affiliated with or endorsed
            by the Government of Pakistan.
          </p>
        </div>
        <div className="ap-footer-links">
          <Link to="/how-it-works">How it works</Link>
          <Link to="/services">Services</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/news">News</Link>
        </div>
      </div>
      <div className="ap-container ap-footer-bottom">
        © {new Date().getFullYear()} Ask Pakistan · Verify important information
        with the relevant government authority.
      </div>
    </footer>
  );
}
