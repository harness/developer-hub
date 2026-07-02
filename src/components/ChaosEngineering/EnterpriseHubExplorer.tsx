import React from "react";
import ExperimentListSection, {
  ExperimentDetails,
} from "./ExperimentListSection";
import { getCategoryDetails } from "./utils/helper";
import faultStyles from "./FaultCard.module.scss";
import gridStyles from "./ChaosFaults.module.scss";

const slugify = (s: string): string =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

export type DrillCategory = {
  title: string;
  category: string;
  description: React.ReactNode;
  items: ExperimentDetails[];
  itemLinkBase: string;
  icon?: string;
  itemLabel?: string;
};

export default function EnterpriseHubExplorer({
  categories,
}: {
  categories: DrillCategory[];
}) {
  const [selected, setSelected] = React.useState<number | null>(null);

  if (selected !== null && categories[selected]) {
    const cat = categories[selected];
    const base = cat.itemLinkBase.endsWith("/")
      ? cat.itemLinkBase.slice(0, -1)
      : cat.itemLinkBase;
    const items: ExperimentDetails[] = cat.items.map((item) => ({
      ...item,
      link: `${base}#${slugify(item.name)}`,
    }));
    return (
      <div>
        <button
          type="button"
          onClick={() => setSelected(null)}
          style={{
            background: "none",
            border: "none",
            color: "var(--ifm-color-primary)",
            cursor: "pointer",
            padding: "8px 0",
            fontSize: "0.95rem",
            marginBottom: "8px",
          }}
        >
          ← Back to all categories
        </button>
        <ExperimentListSection experiments={items} />
      </div>
    );
  }

  return (
    <div className={gridStyles.spaceBetween}>
      {categories.map((cat, idx) => {
        const details = getCategoryDetails(cat.category);
        return (
          <button
            key={cat.category}
            type="button"
            className={faultStyles.tutorialCard}
            onClick={() => setSelected(idx)}
            style={{ cursor: "pointer" }}
          >
            <div className={faultStyles.icon}>
              <img src={cat.icon ?? details.icon} alt={cat.title} />
            </div>
            <div className={faultStyles.title}>{cat.title}</div>
            <div className={faultStyles.description}>{cat.description}</div>
            <div className={`${faultStyles.description} ${faultStyles.faults}`}>
              {`(${cat.items.length} ${cat.itemLabel ?? "templates"})`}
            </div>
          </button>
        );
      })}
    </div>
  );
}
