// components/SalesTable.tsx
"use client";

import Card from "../common/Card";

interface Product {
  name: string;
  price: string;
  quantity: number;
  amount: string;
}

const products: Product[] = [
  { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
  { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
  { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
  { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
  { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" },
];

export default function SalesTable() {
  return (
    <Card className="rounded-2xl p-6 bg-neutral-750 dark:bg-neutral-800 min-h-84">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
          Top Selling Products
        </h3>
      </div>

      <div className="overflow-hidden">
        <table className="w-full text-xs table-fixed">
          <thead>
            <tr className="text-left">
              <th className="py-2 pr-4 text-xs font-medium text-neutral-500 dark:text-neutral-350 w-56">
                Name
              </th>
              <th className="py-2 pl-4 text-xs font-medium text-neutral-500 dark:text-neutral-350">
                Price
              </th>
              <th className="py-2 pl-4 text-xs font-medium text-neutral-500 dark:text-neutral-350">
                Quantity
              </th>
              <th className="py-2 pl-4 text-xs font-medium text-neutral-500 dark:text-neutral-350">
                Amount
              </th>
            </tr>

            {/* thin divider line */}
            <tr>
              <th colSpan={4} className="h-px bg-neutral-100 dark:bg-neutral-700" />
            </tr>
          </thead>

          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="align-top">
                <td className="py-2 pr-4 text-text-primary dark:text-text-primary-dark">
                  <div className="text-xs leading-tight">{p.name}</div>
                </td>

                <td className="py-2 pl-4 text-xs text-text-primary dark:text-text-primary-dark">
                  {p.price}
                </td>

                <td className="py-2 pl-4 text-xs text-text-primary dark:text-text-primary-dark">
                  {p.quantity}
                </td>

                <td className="py-2 pl-4 text-xs text-text-primary dark:text-text-primary-dark">
                  <span className="font-medium">{p.amount}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
