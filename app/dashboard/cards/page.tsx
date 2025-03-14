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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Plus } from "lucide-react";
import { useState } from "react";

interface VirtualCard {
  id: number;
  last4: string;
  type: string;
  balance: number;
  expiresAt: string;
}

export default function CardsPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const demoCards: VirtualCard[] = [
    {
      id: 1,
      last4: "4242",
      type: "Visa",
      balance: 500.00,
      expiresAt: "12/24",
    },
    {
      id: 2,
      last4: "1234",
      type: "Mastercard",
      balance: 1000.00,
      expiresAt: "03/25",
    },
  ];

  const handleGenerateCard = async () => {
    setIsGenerating(true);
    // Simulate card generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Virtual Cards</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate New Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Virtual Card</DialogTitle>
              <DialogDescription>
                Create a new virtual card for online purchases.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Card Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                    <SelectItem value="amex">American Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleGenerateCard} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Card"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {demoCards.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{card.type}</span>
                <CreditCard className="h-5 w-5 text-blue-600" />
              </CardTitle>
              <CardDescription>
                Card ending in {card.last4}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Balance</span>
                  <span className="font-medium">${card.balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expires</span>
                  <span>{card.expiresAt}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}