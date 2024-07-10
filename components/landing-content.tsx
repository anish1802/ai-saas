"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Akankshya Jena",
    avatar: "A",
    title: "CEO",
    description: "This is the best AI product I have ever used.",
  },
  {
    name: "Kompal Ahluwalia",
    avatar: "B",
    title: "CEO",
    description: "This is a very innovative product.",
  },
  {
    name: "Satyam Raj",
    avatar: "C",
    title: "CEO",
    description: "Fusion Verase is a next generation AI that makes work easy 🤩.",
  },
  {
    name: "Srishti Chhabra",
    avatar: "D",
    title: "CEO",
    description: "This is a all in one AI that solves versatile problems.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.name} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
      <footer className="text-center mt-10 p-4 bg-[#192339] text-white">
        <p>Copyright © Anish. Made with ❤️ by Anish Kumar</p>
      </footer>
    </div>
  );
};