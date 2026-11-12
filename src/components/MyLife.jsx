import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { FaWeixin } from "react-icons/fa";
import "../css/MyLife.css";
import { life } from "../siteConfig";

export default function MyLife() {
  const [copied, setCopied] = useState(false);
  if (!life.enabled || !life.photos.length) return null;

  const copyWechat = () => {
    navigator.clipboard?.writeText(life.wechat).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    }).catch(() => {});
  };

  return (
    <section className="life-section" id="life" aria-labelledby="life-heading">
      <h2 className="card-title" id="life-heading">{life.title || "My Life"}</h2>
      {life.paragraphs.map((paragraph, paragraphIndex) => <p className="life-text" key={paragraphIndex}>
        {paragraph.map((segment, segmentIndex) => segment.strong
          ? <strong key={segmentIndex}>{segment.text}</strong>
          : <React.Fragment key={segmentIndex}>{segment.text}</React.Fragment>)}
      </p>)}
      {life.wechat && <div className="life-wechat">
        <FaWeixin aria-hidden="true" />
        <span>WeChat</span>
        <code>{life.wechat}</code>
        <button type="button" onClick={copyWechat} aria-label="Copy WeChat ID">
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? "Copied" : "Copy"}
        </button>
      </div>}
      <div className="life-gallery">
        {life.photos.map((photo) => <figure className={`life-photo${photo.wide ? " is-wide" : ""}`} key={photo.image}>
          <img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" />
          {photo.caption && <figcaption>{photo.caption}</figcaption>}
        </figure>)}
      </div>
    </section>
  );
}
