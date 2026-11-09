import { prisma } from "./db";

export const defaults = {
  schoolName: "Spring Garden Kids World",
  tagline: "A caring early-learning school in Basundhara, Kathmandu",
  address: "Basundhara, Kathmandu, Nepal",
  phone: "+977 984-9254110",
  email: "",
  officeHours: "Sunday - Friday 8:00AM - 4:00PM (Saturday closed)",
  facebookUrl: "https://www.facebook.com/SpringGKW",
  tiktokUrl: "https://www.tiktok.com/@springgarden_kidsschool",
  mapEmbedUrl: "https://www.google.com/maps?q=Spring%20Garden%20Kids%20World%20Basundhara%20Kathmandu%20Nepal&output=embed",
  footerAbout:
    "Spring Garden Kids World is a caring early-learning school in Basundhara, Kathmandu offering creative education in a loving atmosphere for children from Playgroup to Class 3.",
  heroTitle: "A happy place to learn and grow",
  heroSubtitle: null as string | null,
  heroImageUrl: null as string | null,
};

export async function getSettings() {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    return { ...defaults, ...s };
  } catch {
    return defaults;
  }
}

export async function getPublicData() {
  try {
    const [settings, categories, staff, programs, testimonials] = await Promise.all([
      getSettings(),
      prisma.galleryCategory.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        include: { images: { where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] } },
      }),
      prisma.staffMember.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
      prisma.program.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
      prisma.testimonial.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    ]);
    return { settings, categories, staff, programs, testimonials };
  } catch {
    return { settings: defaults, categories: [], staff: [], programs: [], testimonials: [] };
  }
}
