'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Eye, EyeOff, Palette, Image, ImageIcon, FileText, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface BannerData {
  enabled: boolean;
  text: string;
  backgroundColor: string;
  textColor: string;
  bannerType: 'color' | 'backgroundImage' | 'sideImage';
  backgroundImageUrl: string;
  sideImageUrl: string;
  sideImagePosition: 'left' | 'right';
}

const defaultBanner: BannerData = {
  enabled: false,
  text: 'Special offer! Get 20% off your first booking.',
  backgroundColor: '#16a34a',
  textColor: '#ffffff',
  bannerType: 'color',
  backgroundImageUrl: '',
  sideImageUrl: '',
  sideImagePosition: 'left',
};

const AdminBanners = () => {
  const { toast } = useToast();
  const [banner, setBanner] = useState<BannerData>(defaultBanner);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const docRef = doc(db, 'settings', 'banner');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBanner({ ...defaultBanner, ...docSnap.data() as BannerData });
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'banner'), banner);
      toast({
        title: "Banner saved",
        description: banner.enabled ? "Banner is now visible on the website." : "Banner has been disabled.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save banner settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getPreviewStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      backgroundColor: banner.backgroundColor,
      color: banner.textColor,
    };

    if (banner.bannerType === 'backgroundImage' && banner.backgroundImageUrl) {
      style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${banner.backgroundImageUrl})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
    }

    return style;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-eco-green" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Banners</h1>
          <p className="text-muted-foreground">Manage site-wide announcements</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-eco-green hover:bg-eco-green/90">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <Link href="/admin" className="block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-eco-green-light flex items-center justify-center">
                    <Eye className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Banners</h3>
                    <p className="text-sm text-muted-foreground">Manage site announcements</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <Link href="/admin/content" className="block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-eco-green-light flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Content</h3>
                    <p className="text-sm text-muted-foreground">Edit website text</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <Link href="/admin/pricing" className="block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-eco-green-light flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Pricing</h3>
                    <p className="text-sm text-muted-foreground">Update service rates</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Site-Wide Banner</CardTitle>
            <CardDescription>
              Display an announcement banner at the top of every page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                {banner.enabled ? (
                  <Eye className="w-5 h-5 text-eco-green" />
                ) : (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">Banner Status</p>
                  <p className="text-sm text-muted-foreground">
                    {banner.enabled ? 'Banner is visible on the website' : 'Banner is currently hidden'}
                  </p>
                </div>
              </div>
              <Switch
                checked={banner.enabled}
                onCheckedChange={(checked) => setBanner(prev => ({ ...prev, enabled: checked }))}
              />
            </div>

            {/* Banner Text */}
            <div className="space-y-2">
              <Label htmlFor="bannerText">Banner Text</Label>
              <Input
                id="bannerText"
                value={banner.text}
                onChange={(e) => setBanner(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Enter your announcement text..."
              />
            </div>

            {/* Banner Type Selection */}
            <div className="space-y-3">
              <Label>Banner Style</Label>
              <RadioGroup
                value={banner.bannerType}
                onValueChange={(value: 'color' | 'backgroundImage' | 'sideImage') =>
                  setBanner(prev => ({ ...prev, bannerType: value }))
                }
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="color" id="color" />
                  <Label htmlFor="color" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Palette className="w-4 h-4 text-eco-green" />
                    <div>
                      <p className="font-medium">Solid Color</p>
                      <p className="text-xs text-muted-foreground">Simple background color</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="backgroundImage" id="backgroundImage" />
                  <Label htmlFor="backgroundImage" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Image className="w-4 h-4 text-eco-green" />
                    <div>
                      <p className="font-medium">Background Image</p>
                      <p className="text-xs text-muted-foreground">Full-width image behind text</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="sideImage" id="sideImage" />
                  <Label htmlFor="sideImage" className="flex items-center gap-2 cursor-pointer flex-1">
                    <ImageIcon className="w-4 h-4 text-eco-green" />
                    <div>
                      <p className="font-medium">Side Image</p>
                      <p className="text-xs text-muted-foreground">Image on left or right</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Color Options - Always shown */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bgColor">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="bgColor"
                    type="color"
                    value={banner.backgroundColor}
                    onChange={(e) => setBanner(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={banner.backgroundColor}
                    onChange={(e) => setBanner(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={banner.textColor}
                    onChange={(e) => setBanner(prev => ({ ...prev, textColor: e.target.value }))}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={banner.textColor}
                    onChange={(e) => setBanner(prev => ({ ...prev, textColor: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Background Image URL - Only show when backgroundImage type is selected */}
            {banner.bannerType === 'backgroundImage' && (
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <Label htmlFor="bgImageUrl">Background Image URL</Label>
                <Input
                  id="bgImageUrl"
                  value={banner.backgroundImageUrl}
                  onChange={(e) => setBanner(prev => ({ ...prev, backgroundImageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the URL of your background image. Use a high-quality, wide image for best results.
                </p>
              </div>
            )}

            {/* Side Image Options - Only show when sideImage type is selected */}
            {banner.bannerType === 'sideImage' && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="sideImageUrl">Side Image URL</Label>
                  <Input
                    id="sideImageUrl"
                    value={banner.sideImageUrl}
                    onChange={(e) => setBanner(prev => ({ ...prev, sideImageUrl: e.target.value }))}
                    placeholder="https://example.com/icon.png"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use a small icon or logo (recommended height: 32-48px)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Image Position</Label>
                  <RadioGroup
                    value={banner.sideImagePosition}
                    onValueChange={(value: 'left' | 'right') =>
                      setBanner(prev => ({ ...prev, sideImagePosition: value }))
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="left" id="left" />
                      <Label htmlFor="left" className="cursor-pointer">Left</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="right" id="right" />
                      <Label htmlFor="right" className="cursor-pointer">Right</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div
                className="p-4 rounded-lg text-center font-medium flex items-center justify-center gap-4"
                style={getPreviewStyle()}
              >
                {banner.bannerType === 'sideImage' && banner.sideImageUrl && banner.sideImagePosition === 'left' && (
                  <img src={banner.sideImageUrl} alt="Side" className="h-8 w-auto object-contain" />
                )}
                <span>{banner.text || 'Your banner text will appear here'}</span>
                {banner.bannerType === 'sideImage' && banner.sideImageUrl && banner.sideImagePosition === 'right' && (
                  <img src={banner.sideImageUrl} alt="Side" className="h-8 w-auto object-contain" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBanners;