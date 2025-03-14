"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowDownIcon, ArrowUpIcon, CreditCard, RefreshCcw } from "lucide-react";

interface Transaction {
  id: number;
  type: "card" | "conversion" | "deposit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export default function TransactionsPage() {
  const demoTransactions: Transaction[] = [
    {
      id: 1,
      type: "card",
      amount: 250.00,
      description: "Virtual Card Generated #4242",
      date: "2024-03-20T10:30:00Z",
      status: "completed",
    },
    {
      id: 2,
      type: "conversion",
      amount: 1000.00,
      description: "USD to GYD Conversion",
      date: "2024-03-19T15:45:00Z",
      status: "completed",
    },
    {
      id: 3,
      type: "deposit",
      amount: 500.00,
      description: "Prepaid Credit Deposit",
      date: "2024-03-18T09:15:00Z",
      status: "completed",
    },
  ];

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "conversion":
        return <RefreshCcw className="h-4 w-4" />;
      case "deposit":
        return <ArrowDownIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search transactions..."
            className="max-w-xs"
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="card">Card Generation</SelectItem>
              <SelectItem value="conversion">Conversions</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 rounded-full p-2 ${
                    transaction.type === "deposit"
                      ? "bg-green-100 text-green-600"
                      : transaction.type === "conversion"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"
                  }`}>
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === "deposit"
                      ? "text-green-600"
                      : "text-gray-900 dark:text-gray-100"
                  }`}>
                    {transaction.type === "deposit" ? "+" : ""}
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className={`text-sm ${
                    transaction.status === "completed"
                      ? "text-green-600"
                      : transaction.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}