"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bell, BellOff, DollarSign } from "lucide-react";

export default function AlertsPage() {
  const [dailyLimit, setDailyLimit] = useState("1000");
  const [minimumBalance, setMinimumBalance] = useState("100");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your spending alert preferences have been updated.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Spending Alerts</h1>
        <p className="text-muted-foreground">Manage your spending limits and notification preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Spending Limit</CardTitle>
          <CardDescription>
            Set a daily limit to help control your spending
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dailyLimit">Daily Limit (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="dailyLimit"
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                className="pl-10"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="dailyLimitNotif" />
            <Label htmlFor="dailyLimitNotif">
              Notify me when I reach 80% of my daily limit
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Minimum Balance Alert</CardTitle>
          <CardDescription>
            Get notified when your balance falls below a certain amount
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="minBalance">Minimum Balance (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="minBalance"
                type="number"
                value={minimumBalance}
                onChange={(e) => setMinimumBalance(e.target.value)}
                className="pl-10"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="minBalanceNotif" defaultChecked />
            <Label htmlFor="minBalanceNotif">
              Enable minimum balance alerts
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose how you want to receive alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: "email", label: "Email Notifications", icon: Bell },
            { id: "push", label: "Push Notifications", icon: Bell },
            { id: "sms", label: "SMS Alerts", icon: Bell },
            { id: "large", label: "Large Transaction Alerts", icon: BellOff },
          ].map((pref) => (
            <div key={pref.id} className="flex items-center space-x-2">
              <Switch id={pref.id} defaultChecked={pref.id !== "sms"} />
              <Label htmlFor={pref.id} className="flex items-center gap-2">
                <pref.icon className="h-4 w-4" />
                {pref.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
}