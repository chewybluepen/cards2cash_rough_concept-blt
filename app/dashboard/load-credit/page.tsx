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
import { Loader2 } from "lucide-react";

export default function LoadCreditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [carrier, setCarrier] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Credit loaded successfully",
        description: "Your balance has been updated.",
      });
      setVoucherCode("");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Load Prepaid Credit</h1>
        <p className="text-muted-foreground">Convert your prepaid vouchers into digital funds</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Voucher Details</CardTitle>
            <CardDescription>
              Enter your prepaid voucher information below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Carrier</label>
              <Select value={carrier} onValueChange={setCarrier}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digicel">Digicel</SelectItem>
                  <SelectItem value="gtt">GTT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Voucher Code</label>
              <Input
                placeholder="Enter your voucher code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                pattern="[0-9]*"
                minLength={12}
                maxLength={16}
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter the code exactly as it appears on your voucher
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !carrier || !voucherCode}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Load Credit"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Offline Mode</CardTitle>
          <CardDescription>
            Your transactions will be queued and processed automatically when you're back online
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm font-medium">Connection Status</span>
            <span className="text-sm text-green-600">Online</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">Pending Transactions</span>
            <span className="text-sm">0</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}