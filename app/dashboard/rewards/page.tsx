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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Copy, Gift, Share2, Users } from "lucide-react";

export default function RewardsPage() {
  const [referralEmail, setReferralEmail] = useState("");
  const { toast } = useToast();
  const referralCode = "CARDS2CASH50";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Invitation sent",
      description: "Your friend will receive an invitation email shortly",
    });
    setReferralEmail("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rewards & Referrals</h1>
        <p className="text-muted-foreground">Earn rewards and invite friends to Cards2Cash</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Refer Friends
            </CardTitle>
            <CardDescription>
              Invite friends and earn $50 when they make their first transaction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Your Referral Code</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white dark:bg-gray-900 px-3 py-2 rounded border">
                  {referralCode}
                </code>
                <Button variant="outline" size="icon" onClick={handleCopyCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Invite via Email</label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="friend@example.com"
                    value={referralEmail}
                    onChange={(e) => setReferralEmail(e.target.value)}
                    required
                  />
                  <Button type="submit">
                    <Share2 className="h-4 w-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">How it works:</p>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>Share your referral code with friends</li>
                <li>They sign up using your code</li>
                <li>You both get $50 after their first transaction</li>
              </ol>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Partner Offers
            </CardTitle>
            <CardDescription>
              Exclusive deals from our partners
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                partner: "Amazon",
                offer: "Get $10 off your first purchase",
                code: "AMZN10",
                expires: "2024-04-30",
              },
              {
                partner: "Netflix",
                offer: "1 month free subscription",
                code: "NFLX1M",
                expires: "2024-05-15",
              },
              {
                partner: "Uber",
                offer: "50% off your next 3 rides",
                code: "UBER50",
                expires: "2024-04-20",
              },
            ].map((offer, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{offer.partner}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(offer.code);
                      toast({
                        title: "Copied!",
                        description: "Offer code copied to clipboard",
                      });
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {offer.code}
                  </Button>
                </div>
                <p className="text-sm">{offer.offer}</p>
                <p className="text-xs text-muted-foreground">
                  Expires: {new Date(offer.expires).toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Rewards</CardTitle>
          <CardDescription>
            Track your earnings from referrals and offers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-600 dark:text-green-400">
                Total Earned
              </h3>
              <p className="text-2xl font-bold">$150</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Pending Rewards
              </h3>
              <p className="text-2xl font-bold">$50</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Successful Referrals
              </h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}