// components/RightPanel.tsx
"use client";

import type { FC } from "react";
import { notifications, activities, contacts } from "../../data/notifications";
import type { NotificationItem, ActivityItem, ContactItem } from "../../types/notifications";

export const RightPanel: FC = () => {
  return (
    <aside className="w-72 h-screen  border-l border-neutral-550 dark:border-neutral-600 p-4 overflow-auto">
      {/* Notifications */}
      <SectionHeading title="Notifications" />
      <div className="flex flex-col gap-2 mb-4">
        {notifications.map((n: NotificationItem) => (
          <NotificationRow key={`${n.id}-NotificationRow`} item={n} />
        ))}
      </div>

      {/* Activities */}
      <SectionHeading title="Activities" />
      <div className="flex flex-col gap-2 mb-4">
        {activities.map((a: ActivityItem, idx: number) => (
          <ActivityRow item={a} isLast={idx === activities.length - 1} />
        ))}
      </div>

      {/* Contacts */}
      <SectionHeading title="Contacts" />
      <div className="flex flex-col gap-2">
        {contacts.map((c: ContactItem) => (
          <ContactRow key={c.id} item={c} />
        ))}
      </div>
    </aside>
  );
};

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="mb-2 text-sm font-semibold text-text-primary dark:text-text-primary-dark">
      {title}
    </h3>
  );
}

function NotificationRow({ item }: { item: NotificationItem }) {
  const Icon = item.icon;
  return (
    <div
      className="flex items-start gap-2 rounded-md p-1"
      role="listitem"
    >
      {/* fixed-size icon box that never shrinks */}
      <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-neutral-660">
        {Icon ? (
          <Icon className="w-3 h-3 text-neutral-950" />
        ) : (
          <span className="w-3 h-3 rounded bg-neutral-300" />
        )}
      </div>

      {/* allow truncation: min-w-0 + truncate on title */}
      <div className="min-w-0">
        <div className="text-sm text-text-primary dark:text-text-primary-dark truncate">
          {item.title}
        </div>
        {item.subtitle && (
          <div className="text-xs text-neutral-250 dark:text-neutral-350 mt-0.5">
            {item.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityRow({
  item,
  isLast,
}: {
  item: ActivityItem;
  isLast?: boolean;
}) {
  return (
    <div className="flex items-start gap-2 px-2 py-1">
      {/* avatar wrapper (relative so connector can be absolutely positioned) */}
      <div className="relative flex-shrink-0">
        <img
          src={item.avatar}
          alt=""
          className="w-6 h-6 rounded-full object-cover"
        />

        {/* vertical connector line: hidden on last item */}
        {!isLast && (
          <span
            className="absolute left-1/2 top-[calc(100%+7px)] -translate-x-1/2 w-[1px] h-3.5 bg-neutral-550 dark:bg-neutral-600"
            aria-hidden
          />
        )}
      </div>

      {/* content */}
      <div className="min-w-0">
        <div className="text-sm text-text-primary dark:text-text-primary-dark truncate">
          {item.title}
        </div>
        {item.time && (
          <div className="text-xs text-neutral-250 dark:text-neutral-350 mt-0.5">
            {item.time}
          </div>
        )}
      </div>
    </div>
  );
}


function ContactRow({ item }: { item: ContactItem }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <img
        src={item.avatar}
        alt={item.name}
        className="flex-shrink-0 w-6 h-6 rounded-full object-cover"
      />
      <div className="text-sm text-text-primary dark:text-text-primary-dark truncate">
        {item.name}
      </div>
    </div>
  );
}

export default RightPanel;
