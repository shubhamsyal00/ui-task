"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Define tuple type [lon, lat]
type Location = {
    name: string;
    value: number;
    coords: [number, number];
};

const locations: Location[] = [
    { name: "New York", value: 72, coords: [-74.006, 40.7128] },
    { name: "San Francisco", value: 39, coords: [-122.4194, 37.7749] },
    { name: "Sydney", value: 25, coords: [151.2093, -33.8688] },
    { name: "Singapore", value: 61, coords: [103.8198, 1.3521] },
];

export default function RevenueByLocation() {
    const maxValue = Math.max(...locations.map((l) => l.value));

    return (
        <div className="rounded-2xl p-6 bg-neutral-750 dark:bg-neutral-800 h-[318px]">
            <h3 className="text-sm font-semibold mb-4 text-text-primary dark:text-text-primary-dark">
                Revenue by Location
            </h3>

            {/* World map */}
            <div className="flex justify-center">
                <ComposableMap
                    width={154}
                    height={82}
                    projectionConfig={{ scale: 35 }} // tweak scale for better fit
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="var(--color-geo-fill)"
                                    stroke="var(--color-geo-stroke)"
                                    strokeWidth={0.3}
                                />
                            ))
                        }
                    </Geographies>

                    {locations.map((loc) => (
                        <Marker key={loc.name} coordinates={loc.coords}>
                            <circle r={3} fill="#A8C5DA" stroke="#fff" strokeWidth={1} />
                        </Marker>
                    ))}
                </ComposableMap>
            </div>

            {/* Locations list with progress bars */}
            <div className="flex flex-col gap-3">
                {locations.map((loc) => (
                    <div key={loc.name}>
                        <div className="flex justify-between text-xs text-text-primary dark:text-text-primary-dark">
                            <span>{loc.name}</span>
                            <span>{loc.value}K</span>
                        </div>
                        <div className="w-full bg-neutral-400 dark:bg-neutral-600 h-1 rounded mt-1">
                            <div
                                className="h-1 rounded bg-[#A8C5DA]"
                                style={{ width: `${(loc.value / maxValue) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
