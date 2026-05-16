'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContentData {
  hero: {
    title: string;
    accentText: string;
    subtitle: string;
    ctaText: string;
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    standardTitle: string;
    standardDescription: string;
    deepTitle: string;
    deepDescription: string;
    airbnbTitle: string;
    airbnbDescription: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
  };
}

const defaultContent: ContentData = {
  hero: {
    title: 'Cleaning That Cares for Your Home',
    accentText: 'and the Planet',
    subtitle: 'Experience premium cleaning services using 100% plant-based, non-toxic products. Safe for kids, pets, and the environment.',
    ctaText: 'Book Now',
  },
  services: {
    sectionTitle: 'Our Services',
    sectionSubtitle: 'Choose from our range of eco-friendly cleaning options',
    standardTitle: 'Standard Eco Cleaning',
    standardDescription: 'Regular maintenance clean with eco-safe products',
    deepTitle: 'Deep Eco Cleaning',
    deepDescription: 'Full-detail premium clean for buildup or seasonal resets',
    airbnbTitle: 'Airbnb Turnover',
    airbnbDescription: 'Fast, consistent turnover service for rentals',
  },
  about: {
    title: 'About eco-elan',
    description: 'We are a team of professional cleaners dedicated to providing eco-friendly cleaning services.',
    mission: 'Our mission is to provide exceptional cleaning while protecting the environment.',
  },
  contact: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    phone: '+1(437) 2654977',
    email: ' info@eco-elan.com',
    address: '123 Green Street, Eco City, EC 12345',
  },
};

const AdminContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent({ ...defaultContent, ...docSnap.data() as ContentData });
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'content'), content);
      toast({
        title: "Content saved",
        description: "All content changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (section: keyof ContentData, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content</h1>
          <p className="text-muted-foreground">Manage website text content</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Main homepage banner content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Title</Label>
                  <Input
                    id="heroTitle"
                    value={content.hero.title}
                    onChange={(e) => updateField('hero', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroAccent">Accent Text</Label>
                  <Input
                    id="heroAccent"
                    value={content.hero.accentText}
                    onChange={(e) => updateField('hero', 'accentText', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={content.hero.subtitle}
                  onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroCta">CTA Button Text</Label>
                <Input
                  id="heroCta"
                  value={content.hero.ctaText}
                  onChange={(e) => updateField('hero', 'ctaText', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Section</CardTitle>
              <CardDescription>Service descriptions and titles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servicesSectionTitle">Section Title</Label>
                  <Input
                    id="servicesSectionTitle"
                    value={content.services.sectionTitle}
                    onChange={(e) => updateField('services', 'sectionTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servicesSectionSubtitle">Section Subtitle</Label>
                  <Input
                    id="servicesSectionSubtitle"
                    value={content.services.sectionSubtitle}
                    onChange={(e) => updateField('services', 'sectionSubtitle', e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h4 className="font-medium">Standard Cleaning</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="standardTitle">Title</Label>
                    <Input
                      id="standardTitle"
                      value={content.services.standardTitle}
                      onChange={(e) => updateField('services', 'standardTitle', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standardDesc">Description</Label>
                    <Textarea
                      id="standardDesc"
                      value={content.services.standardDescription}
                      onChange={(e) => updateField('services', 'standardDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h4 className="font-medium">Deep Cleaning</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deepTitle">Title</Label>
                    <Input
                      id="deepTitle"
                      value={content.services.deepTitle}
                      onChange={(e) => updateField('services', 'deepTitle', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deepDesc">Description</Label>
                    <Textarea
                      id="deepDesc"
                      value={content.services.deepDescription}
                      onChange={(e) => updateField('services', 'deepDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h4 className="font-medium">Airbnb Turnover</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="airbnbTitle">Title</Label>
                    <Input
                      id="airbnbTitle"
                      value={content.services.airbnbTitle}
                      onChange={(e) => updateField('services', 'airbnbTitle', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="airbnbDesc">Description</Label>
                    <Textarea
                      id="airbnbDesc"
                      value={content.services.airbnbDescription}
                      onChange={(e) => updateField('services', 'airbnbDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Page</CardTitle>
              <CardDescription>About section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aboutTitle">Title</Label>
                <Input
                  id="aboutTitle"
                  value={content.about.title}
                  onChange={(e) => updateField('about', 'title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aboutDescription">Description</Label>
                <Textarea
                  id="aboutDescription"
                  value={content.about.description}
                  onChange={(e) => updateField('about', 'description', e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aboutMission">Mission Statement</Label>
                <Textarea
                  id="aboutMission"
                  value={content.about.mission}
                  onChange={(e) => updateField('about', 'mission', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Contact page content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactTitle">Page Title</Label>
                  <Input
                    id="contactTitle"
                    value={content.contact.title}
                    onChange={(e) => updateField('contact', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactSubtitle">Page Subtitle</Label>
                  <Input
                    id="contactSubtitle"
                    value={content.contact.subtitle}
                    onChange={(e) => updateField('contact', 'subtitle', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    value={content.contact.phone}
                    onChange={(e) => updateField('contact', 'phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    value={content.contact.email}
                    onChange={(e) => updateField('contact', 'email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactAddress">Address</Label>
                  <Input
                    id="contactAddress"
                    value={content.contact.address}
                    onChange={(e) => updateField('contact', 'address', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
