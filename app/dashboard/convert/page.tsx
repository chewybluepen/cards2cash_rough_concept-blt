"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";

export default function ConvertFundsPage() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("GYD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock exchange rate
  const exchangeRate = 0.0048; // 1 GYD = 0.0048 USD

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conversion successful",
        description: "Your funds have been converted.",
      });
      setAmount("");
    }, 2000);
  };

  const convertedAmount = amount ? (parseFloat(amount) * exchangeRate).toFixed(2) : "0.00";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Convert Funds</h1>
        <p className="text-muted-foreground">Exchange your funds between currencies</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Currency Conversion</CardTitle>
            <CardDescription>
              Convert your funds using real-time exchange rates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GYD">GYD - Guyanese Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Exchange Rate</span>
                <span className="font-medium">1 GYD = {exchangeRate} USD</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-sm">You'll receive</span>
                <span className="font-medium text-lg">
                  {convertedAmount} {toCurrency}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  Convert Funds
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { from: "GYD", to: "USD", amount: "50000", rate: "0.0048", date: "2024-03-20" },
              { from: "GYD", to: "USD", amount: "25000", rate: "0.0048", date: "2024-03-19" },
            ].map((conversion, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">
                    {conversion.amount} {conversion.from} → {(parseFloat(conversion.amount) * parseFloat(conversion.rate)).toFixed(2)} {conversion.to}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(conversion.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  Rate: {conversion.rate}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}