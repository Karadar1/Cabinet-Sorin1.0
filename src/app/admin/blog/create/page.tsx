"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, Type, FileText, User, Tag } from "lucide-react";

// --- Custom Colors ---
const PRIMARY_COLOR = "#224e4d"; // Dark Green
const SECONDARY_COLOR = "#356154"; // Medium Green (Accent/Hover Color)
// ---------------------

// Mock Category Data
const CATEGORIES = ["Sănătate Generală", "Nutriție", "Comportament", "Urgențe", "Dermatologie"];

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    resume: "",
    content: "",
    category: CATEGORIES[0],
    author: "Dr. Sorin Popescu",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // Custom Tailwind classes
  const primaryText = `text-[${PRIMARY_COLOR}]`;
  const primaryBg = `bg-[${PRIMARY_COLOR}]`;
  const secondaryBg = `bg-[${SECONDARY_COLOR}]`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        // Convert to Base64 instead of uploading to Firebase Storage
        imageUrl = await convertToBase64(imageFile);
      }

      const blogPostPayload = {
        title: formData.title,
        resume: formData.resume,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        image: imageUrl,
      };

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPostPayload),
      });

      if (!response.ok) throw new Error('Failed to create blog post');

      if (imageFile && imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);

      router.push('/blog');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("A apărut o eroare la salvarea articolului. Verifică consola pentru detalii.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full hover:bg-slate-200/50"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Adaugă Articol Nou
              </h1>
              <p className="text-sm text-slate-500">
                Creează un nou articol pentru blogul clinicii.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">

            {/* Title & Metadata Section */}
            <div className="space-y-4">
              <div className={`flex items-center gap-2 ${primaryText} font-medium border-b border-green-100 pb-2`}>
                <Type className="w-5 h-5" />
                <h2>Detalii Principale</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">

                {/* Title */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Titlu Articol</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="ex: Cum să îngrijești dinții câinelui tău"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="text-lg font-medium"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-500" />
                    <Label htmlFor="category">Categorie</Label>
                  </div>
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Select>
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    <Label htmlFor="author">Autor</Label>
                  </div>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Numele Autorului"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Resume (Excerpt) */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="resume">Rezumat (pentru carduri)</Label>
                  <Textarea
                    id="resume"
                    name="resume"
                    placeholder="Un scurt rezumat care va apărea pe pagina principală (max 255 caractere)..."
                    value={formData.resume}
                    onChange={handleChange}
                    rows={2}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              <div className={`flex items-center gap-2 ${primaryText} font-medium border-b border-green-100 pb-2`}>
                <FileText className="w-5 h-5" />
                <h2>Conținut</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Conținutul Articolului</Label>
                <div className="relative">
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Scrie aici conținutul articolului..."
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="min-h-[300px] font-mono text-sm leading-relaxed"
                  />
                  <p className="absolute bottom-2 right-2 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded">
                    Markdown suportat
                  </p>
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="space-y-4">
              <div className={`flex items-center gap-2 ${primaryText} font-medium border-b border-green-100 pb-2`}>
                <ImageIcon className="w-5 h-5" />
                <h2>Imagine Principală</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageFile">Încarcă Imagine Principală</Label>
                <div className="flex gap-2">
                  <input
                    id="imageFile"
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-slate-700 hover:file:bg-gray-200"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Imaginea va fi salvată direct în baza de date. Vă rugăm să folosiți imagini optimizate (sub 1MB).
                </p>
              </div>

              {imagePreviewUrl && (
                <div className="mt-4 relative aspect-video w-full max-w-md rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Anulează
              </Button>
              <Button
                type="submit"
                className={`min-w-[120px] ${primaryBg} hover:${secondaryBg}`}
                disabled={loading}
              >
                {loading ? (
                  "Se salvează..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Publică
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const Input = (props: any) => (
  <input
    {...props}
    className={`w-full flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[${SECONDARY_COLOR}] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ''}`}
  />
);

const Textarea = (props: any) => (
  <textarea
    {...props}
    className={`w-full flex min-h-[80px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[${SECONDARY_COLOR}] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ''}`}
  />
);

const Select = (props: any) => (
  <select
    {...props}
    className={`w-full flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[${SECONDARY_COLOR}] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-no-repeat bg-[length:1.5rem_1.5rem] bg-[right_0.75rem_center] ${props.className || ''}`}
    style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3 3 3-3m0 6l-3-3-3 3' stroke='${SECONDARY_COLOR.replace('#', '%23')}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
    }}
  >
    {props.children}
  </select>
);

const Button = (props: any) => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = {
    default: `bg-[${PRIMARY_COLOR}] hover:bg-[${SECONDARY_COLOR}] text-white shadow-md`,
    outline: "border border-gray-300 bg-white hover:bg-gray-100 hover:text-slate-900",
    ghost: "hover:bg-gray-100",
    icon: "h-10 w-10",
    base: "h-10 px-4 py-2"
  };

  const styleClass = props.variant ? variantClasses[props.variant as keyof typeof variantClasses] : variantClasses.default;
  const sizeClass = props.size === 'icon' ? variantClasses.icon : variantClasses.base;

  return (
    <button
      {...props}
      className={`${base} ${styleClass} ${sizeClass} ${props.className || ''}`}
    >
      {props.children}
    </button>
  );
};

const Label = (props: any) => (
  <label {...props} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    {props.children}
  </label>
);