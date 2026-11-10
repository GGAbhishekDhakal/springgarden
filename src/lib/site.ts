import { prisma } from "./db";

export const defaults = {
  schoolName: "Spring Garden Kids World",
  tagline: "A caring early-learning school in Basundhara, Kathmandu",
  address: "Basundhara, Kathmandu, Nepal",
  phone: "+977 984-9254110",
  email: "",
  officeHours: "Sunday - Friday 8:00AM - 4:00PM <br> Saturday CLOSED",
  facebookUrl: "https://www.facebook.com/SpringGKW",
  tiktokUrl: "https://www.tiktok.com/@springgarden_kidsschool",
  mapEmbedUrl: "https://www.google.com/maps?q=Spring%20Garden%20Kids%20World%20Basundhara%20Kathmandu%20Nepal&output=embed",
  footerAbout:
    "Spring Garden Kids World is a caring early-learning school in Basundhara, Kathmandu offering creative education in a loving atmosphere for children from Playgroup to Class 3.",
  heroTitle: "Bring Fun Life To Your Kids",
  heroSubtitle: "A caring early-learning school in Basundhara, Kathmandu — from Playgroup to Class 3.",
  heroImageUrl: "/images/kid_transparent.png",
};

export const legacyGallery = [
  { id: "lg1", url: "/images/img_1.jpg", caption: "", categoryName: "Gallery" },
  { id: "lg2", url: "/images/img_2.jpg", caption: "", categoryName: "Gallery" },
  { id: "lg3", url: "/images/img_3.jpg", caption: "", categoryName: "Gallery" },
  { id: "lg4", url: "/images/img_4.jpg", caption: "", categoryName: "Gallery" },
  { id: "lg5", url: "/images/img_5.jpg", caption: "", categoryName: "Gallery" },
  { id: "lg6", url: "/images/img_6.jpg", caption: "", categoryName: "Gallery" },
];

export const legacyStaff = [
  { id: "ls1", name: "School Principal", role: "Principal", bio: "Leads the school with love, experience and a vision for joyful learning.", photoUrl: "/images/person_1.jpg", published: true },
  { id: "ls2", name: "Playgroup Teacher", role: "Playgroup Teacher", bio: "Caring hands that make every child feel safe, loved and eager to learn.", photoUrl: "/images/person_2.jpg", published: true },
  { id: "ls3", name: "Kindergarten Teacher", role: "Kindergarten Teacher", bio: "Makes phonics, numbers and art fun for our youngest learners.", photoUrl: "/images/person_3.jpg", published: true },
  { id: "ls4", name: "Primary Teacher", role: "Primary Teacher", bio: "Builds strong foundations in English, Nepali and mathematics.", photoUrl: "/images/person_4.jpg", published: true },
  { id: "ls5", name: "Sports & Activities", role: "Sports & Activities", bio: "Keeps kids active with games, sports day, music, dance and events.", photoUrl: "/images/person_5.jpg", published: true },
  { id: "ls6", name: "Admission Coordinator", role: "Coordinator", bio: "Happy to guide parents through admission, fees and school visits.", photoUrl: "/images/person_1.jpg", published: true },
];

export const legacyPrograms = [
  { id: "lp1", title: "Playgroup", ageRange: "", description: "A gentle first step for little ones. Play-based learning, music, rhymes and lots of love.", published: true },
  { id: "lp2", title: "Nursery & Kindergarten", ageRange: "", description: "Phonics, numbers, art and activity-based classes that prepare children for primary school.", published: true },
  { id: "lp3", title: "Primary (Class 1-3)", ageRange: "", description: "A strong academic foundation in English and Nepali with sports, clubs and events.", published: true },
];

export const legacyTestimonials = [
  { id: "lt1", name: "Parent of a Playgroup Student", role: "Parent", location: "Basundhara, Kathmandu", quote: "My daughter runs happily into class every morning. The teachers are so caring and she has learned so much through play.", photoUrl: "/images/person_1.jpg" },
  { id: "lt2", name: "Parent of a Kindergarten Student", role: "Parent", location: "Kathmandu", quote: "A wonderful, safe and creative environment. My son loves the outdoor playtime and comes home full of stories every day.", photoUrl: "/images/person_3.jpg" },
  { id: "lt3", name: "Parent of a Primary Student", role: "Parent", location: "Kathmandu", quote: "The school takes a truly holistic approach. My child is growing in confidence, in studies and in good values.", photoUrl: "/images/person_2.jpg" },
];

export async function getSettings() {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    return { ...defaults, ...(s || {}) };
  } catch {
    return defaults;
  }
}

export async function getPublicData() {
  try {
    const [settings, categories, staff, programs, testimonials, feePlans] = await Promise.all([
      getSettings(),
      prisma.galleryCategory.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        include: { images: { where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] } },
      }),
      prisma.staffMember.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
      prisma.program.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
      prisma.testimonial.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
      prisma.feePlan.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    ]);
    const hasGallery = categories.some((c) => c.images.length > 0);
    const galleryData = hasGallery ? categories : [];
    const useLegacyGallery = !hasGallery;
    const staffData = staff.length > 0 ? staff : legacyStaff;
    const useLegacyStaff = staff.length === 0;
    const programsData = programs.length > 0 ? programs : legacyPrograms;
    const useLegacyPrograms = programs.length === 0;
    const testimonialsData = testimonials.length > 0 ? testimonials : legacyTestimonials;
    const useLegacyTestimonials = testimonials.length === 0;
    return { settings, categories: galleryData, staff: staffData, programs: programsData, testimonials: testimonialsData, feePlans, useLegacyGallery, useLegacyStaff, useLegacyPrograms, useLegacyTestimonials };
  } catch {
    return {
      settings: defaults,
      categories: [],
      staff: legacyStaff,
      programs: legacyPrograms,
      testimonials: legacyTestimonials,
      feePlans: [],
      useLegacyGallery: true,
      useLegacyStaff: true,
      useLegacyPrograms: true,
      useLegacyTestimonials: true,
    };
  }
}
