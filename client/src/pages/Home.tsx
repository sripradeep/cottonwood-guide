import { useEffect, useRef, useState } from "react";
import {
  Wine, MapPin, Utensils, Mountain, ShoppingBag, Train, Landmark,
  Star, Phone, Clock, ExternalLink, ChevronDown, Menu, X, Home as HomeIcon,
  Droplets, TreePine
} from "lucide-react";

/* ─── Asset URLs ─────────────────────────────────────────────────────────── */
const P = import.meta.env.BASE_URL; // Vite base URL (/cottonwood-guide/ in prod)
// Real Airbnb property photos
const EXTERIOR_IMG = P + "images/Photo_20260614015645_540ccb69-b174-41c8-9788-957ca829f986.jpg";
const LIVING_ROOM_IMG = P + "images/Photo_20260613232757_a07f6a05-18cd-4150-a266-48d2a6749789.jpg";
const BEDROOM_IMG = P + "images/Photo_20260607192651_34d8c326-53c2-4a78-953f-5e93a36138dc.jpg";
const DINING_IMG = P + "images/Photo_20260614000611_4dfeba9b-a4b7-447a-aab3-fb2b8e86aed4.jpg";
const ENTRANCE_IMG = P + "images/Photo_20260613234705_59dc0fef-5ae4-4fcf-813a-dbd63c4899cd.jpg";
const KITCHEN_IMG = P + "images/Photo_20260607225015_f7fc440e-0474-4017-94ae-b3197389ca61.jpg";
const BEDROOM2_IMG = P + "images/Photo_20260607222544_b646d956-cd01-4e4c-8eee-130cf2c0ccb8.jpg";
const WORKSPACE_IMG = P + "images/Photo_20260607193200_9888a411-a417-4ecd-b6ae-2b9a62e37a05.jpg";
const OUTDOOR_IMG = P + "images/Photo_20260607154835_ccaa59fb-a87b-4d76-9245-452e2eb240fd.jpg";
const HOT_TUB_IMG = P + "images/Photo_20260607154835_ccaa59fb-a87b-4d76-9245-452e2eb240fd.jpg";
const LIVING2_IMG = P + "images/Photo_20260607154835_ccaa59fb-a87b-4d76-9245-452e2eb240fd.jpg";
// AI-generated hero & area images
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663317602054/2iWiJ59KVFa8fT2GJNUXDF/hero_cottonwood-ngDTPLCBpsJZ9HWGrPnM7i.webp";
const WINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663317602054/2iWiJ59KVFa8fT2GJNUXDF/wine_hero-nyov3UfMdGjvNJb66jU2g7.webp";
const LOGO_IMG = P + "images/Grapevine_Logo.png";
const PARKING_IMG = P + "images/609_Cottonwood_Parking_Noaddress_Final2.png";
const JEROME_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663317602054/2iWiJ59KVFa8fT2GJNUXDF/jerome_hero-jXuxaBZ3VYDRKtoG9RjTFA.webp";
const OLD_TOWN_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Commercial_Historic_District_%28Cottonwood%2C_Arizona%29.jpg/1280px-Commercial_Historic_District_%28Cottonwood%2C_Arizona%29.jpg";
const VERDE_VINEYARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663317602054/2iWiJ59KVFa8fT2GJNUXDF/wine_hero-nyov3UfMdGjvNJb66jU2g7.webp";
const SEDONA_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Cathedral_Rock_-_Sedona_AZ-1.jpg/1280px-Cathedral_Rock_-_Sedona_AZ-1.jpg";
const DEAD_HORSE_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Dead_Horse_Ranch.jpg/1280px-Dead_Horse_Ranch.jpg";
const TUZIGOOT_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Tuzigoot_December_2013_1.JPG/1280px-Tuzigoot_December_2013_1.JPG";
const RAILROAD_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Verde_Canyon_FP7_2025.jpg/1280px-Verde_Canyon_FP7_2025.jpg";

/* ─── Nav sections ───────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "property", label: "Your Home" },
  { id: "wine", label: "Wine Country" },
  { id: "daytrips", label: "Day Trips" },
  { id: "outdoors", label: "Outdoors" },
  { id: "antiques", label: "Antiques" },
  { id: "dining", label: "Dining" },
  { id: "tips", label: "Guest Tips" },
];

/* ─── Fade-up hook ───────────────────────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Section wrapper ────────────────────────────────────────────────────── */
function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useFadeUp();
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div ref={ref} className="container fade-up">
        {children}
      </div>
    </section>
  );
}

/* ─── Section heading ────────────────────────────────────────────────────── */
function SectionHeading({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center gap-2 mb-4">
        <Icon size={20} className="text-terracotta" />
        <span className="font-body text-sm uppercase tracking-widest text-terracotta font-bold">{title}</span>
      </div>
      {subtitle && (
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <div className="section-divider mt-4" />
    </div>
  );
}

/* ─── Attraction card ────────────────────────────────────────────────────── */
function AttractionCard({
  img, title, distance, description, tags, link
}: {
  img: string; title: string; distance?: string; description: string; tags?: string[]; link?: string;
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border card-hover group">
      <div className="relative h-52 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {distance && (
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-body px-2 py-1 rounded-full flex items-center gap-1">
            <MapPin size={10} /> {distance}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
        {tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map(t => (
              <span key={t} className="text-xs font-body bg-sand text-muted-foreground px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        )}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-body text-terracotta hover:underline font-bold">
            Learn more <ExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Winery card ────────────────────────────────────────────────────────── */
function WineryCard({ name, address, hours, note }: { name: string; address: string; hours: string; note?: string }) {
  return (
    <div className="bg-white rounded-lg border border-border p-5 card-hover">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Wine size={14} className="text-terracotta" />
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-foreground">{name}</h4>
          <p className="font-body text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <MapPin size={10} /> {address}
          </p>
          <p className="font-body text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <Clock size={10} /> {hours}
          </p>
          {note && <p className="font-body text-xs text-sage mt-1 italic">{note}</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Dining card ────────────────────────────────────────────────────────── */
function DiningCard({ name, type, note }: { name: string; type: string; note: string }) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
        <Utensils size={14} className="text-sage" />
      </div>
      <div>
        <h4 className="font-display text-base font-semibold text-foreground">{name}</h4>
        <p className="font-body text-xs font-bold text-terracotta uppercase tracking-wide">{type}</p>
        <p className="font-body text-sm text-muted-foreground mt-0.5">{note}</p>
      </div>
    </div>
  );
}

/* ─── Tip card ───────────────────────────────────────────────────────────── */
function TipCard({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="bg-white rounded-xl border border-border p-6 card-hover">
      <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
        <Icon size={18} className="text-terracotta" />
      </div>
      <h4 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h4>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("property");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-cream font-body">

      {/* ── Sticky Nav ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}>
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo("property")} className="flex items-center gap-2">
            <img src={LOGO_IMG} alt="Grapevine Stays" className="h-9 w-auto object-contain" style={{filter: scrolled ? 'none' : 'brightness(0) invert(1)'}} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`font-body text-sm px-3 py-1.5 rounded-full transition-all ${
                  activeSection === id
                    ? "bg-terracotta text-white"
                    : scrolled
                      ? "text-foreground hover:text-terracotta"
                      : "text-white/90 hover:text-white"
                }`}>
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button className={`md:hidden transition-colors ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border shadow-lg">
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="w-full text-left px-6 py-3 font-body text-sm text-foreground hover:bg-sand hover:text-terracotta transition-colors border-b border-border/50 last:border-0">
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img src={HERO_IMG} alt="Cottonwood Arizona aerial view" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 mb-6">
            <MapPin size={12} className="text-gold" />
            <span className="font-body text-xs text-white/90 tracking-widest uppercase">609 W Fir St · Cottonwood, AZ 86326</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Your Verde Valley<br /><em className="text-gold">Basecamp</em>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-8">
            Wine country, red rocks, ghost towns, and the Verde River — all within reach from your doorstep.
          </p>
          <button onClick={() => scrollTo("property")}
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-body font-bold px-8 py-3 rounded-full transition-all duration-200 hover:scale-105">
            Explore Your Guide <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* ── Property ── */}
      <Section id="property">
        <SectionHeading icon={HomeIcon} title="Your Home" subtitle="A sophisticated desert retreat in the Mingus Foothills — mountain views, hot tub, fire pit, and everything you need to feel right at home." />

        {/* Photo gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10 rounded-2xl overflow-hidden">
          <div className="col-span-2 row-span-2">
            <img src={EXTERIOR_IMG} alt="Cottonwood Casa exterior" className="w-full h-full object-cover" style={{minHeight: '280px'}} />
          </div>
          <img src={LIVING_ROOM_IMG} alt="Living room" className="w-full h-36 object-cover" />
          <img src={BEDROOM_IMG} alt="Primary bedroom" className="w-full h-36 object-cover" />
          <img src={DINING_IMG} alt="Dining area" className="w-full h-36 object-cover" />
          <img src={ENTRANCE_IMG} alt="Front entrance" className="w-full h-36 object-cover" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Mountain Views | Hot Tub | Fire Pit</h2>
            <p className="font-body text-sm text-terracotta font-bold uppercase tracking-widest mb-4">Cottonwood Casa · 609 W Fir Street</p>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              A spacious desert home that feels as good as it looks. Wide-plank floors, linen drapes catching the Arizona light, and a dining room anchored beneath a sculptural chandelier. Sweeping Sedona red rock and Mingus Mountain views from your door. Soak in the hot tub (seats 6), gather around the fire pit (seats 8), or unwind across multiple living areas designed with high-end MCM furnishings.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Bedrooms", value: "3" },
                { label: "Bathrooms", value: "2.5" },
                { label: "Max Guests", value: "8" },
                { label: "To Old Town", value: "~5 min" },
                { label: "To Sedona", value: "~20 min" },
                { label: "To Jerome", value: "~15 min" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-sand rounded-lg p-3 text-center">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
                  <p className="font-display text-lg font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-4 space-y-2">
              <p className="font-body text-sm text-foreground">
                <strong className="text-terracotta">WiFi Network:</strong> FirStreet_WiFi
              </p>
              <p className="font-body text-sm text-foreground">
                <strong className="text-terracotta">WiFi Password:</strong> 5ir$treet
              </p>
              <p className="font-body text-sm text-foreground">
                <strong className="text-terracotta">Check-in:</strong> 3:00 PM · <strong className="text-terracotta">Check-out:</strong> 11:00 AM
              </p>
              <p className="font-body text-sm text-foreground">
                <strong className="text-terracotta">Entry:</strong> Self check-in via smartlock — code sent 24 hrs before arrival
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-foreground">Inside the Casa</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <img src={KITCHEN_IMG} alt="Kitchen" className="w-full h-36 object-cover rounded-xl mb-1" />
                <p className="font-body text-xs text-muted-foreground text-center">Third bedroom (bunks)</p>
              </div>
              <div>
                <img src={BEDROOM2_IMG} alt="Bedroom 2" className="w-full h-36 object-cover rounded-xl mb-1" />
                <p className="font-body text-xs text-muted-foreground text-center">Queen bedroom</p>
              </div>
              <div>
                <img src={WORKSPACE_IMG} alt="Workspace" className="w-full h-36 object-cover rounded-xl mb-1" />
                <p className="font-body text-xs text-muted-foreground text-center">Dedicated workspace</p>
              </div>
              <div>
                <img src={HOT_TUB_IMG} alt="Hot tub" className="w-full h-36 object-cover rounded-xl mb-1" />
                <p className="font-body text-xs text-muted-foreground text-center">Hot tub (seats 6)</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-border p-4">
              <p className="font-body text-xs font-bold text-terracotta uppercase tracking-wide mb-2">Amenities Highlights</p>
              <div className="grid grid-cols-2 gap-1">
                {["Hot tub (seats 6)","Fire pit (seats 8)","Mountain & desert views","Dedicated workspace","Smart TVs + blackout curtains","Fully stocked kitchen","Free parking (2 spots)","Pet friendly","Self check-in","High-speed WiFi","Drip coffee maker","Multiple living areas"].map(a => (
                  <div key={a} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                    <span className="font-body text-xs text-muted-foreground">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Parking Diagram */}
        <div className="mt-12 bg-sand rounded-2xl border border-border p-6">
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">Parking</h3>
          <p className="font-body text-sm text-muted-foreground mb-4">
            Two dedicated parking spots are available on the property. Please use the white-outlined spaces at the top of the driveway as shown in the diagram below.
          </p>
          <div className="rounded-xl overflow-hidden border border-border">
            <img src={PARKING_IMG} alt="Parking diagram for 609 W Fir St" className="w-full object-cover" style={{maxHeight: '420px', objectPosition: 'center'}} />
          </div>
          <p className="font-body text-xs text-muted-foreground text-center mt-2 italic">Your two dedicated spots are the white-outlined spaces at the top of the driveway.</p>
        </div>
      </Section>

      {/* ── Wine Country ── */}
      <section id="wine" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={WINE_IMG} alt="Wine country" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="container relative z-10 fade-up">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Wine size={20} className="text-gold" />
              <span className="font-body text-sm uppercase tracking-widest text-gold font-bold">Wine Country</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Heart of Arizona<br /><em className="text-gold">Wine Country</em>
            </h2>
            <p className="font-body text-white/80 max-w-2xl mx-auto leading-relaxed">
              Cottonwood sits at the center of the Verde Valley AVA — one of Arizona's most celebrated wine regions. Over a dozen tasting rooms line Old Town's Main Street, all within walking distance of each other.
            </p>
            <div className="section-divider mt-4" style={{ background: "linear-gradient(to right, transparent, oklch(0.78 0.12 75), transparent)" }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              { name: "Arizona Stronghold Vineyards", address: "1023 N Main St, Cottonwood", hours: "Daily from noon (Fri–Sat until 9pm)", note: "Cochise County grapes, expert staff" },
              { name: "Da Vines Vineyard & Bistro", address: "705 N Main St, Cottonwood", hours: "Wed–Sat 11am–8pm, Sun 11am–3pm", note: "French bistro menu + 100% AZ wine" },
              { name: "Merkin Vineyards Hilltop", address: "770 Verde Heights Dr, Cottonwood", hours: "Sun 10am–8pm, Mon–Thu 11am–9pm, Fri–Sat 11am–10pm", note: "Stunning hilltop views + full kitchen" },
              { name: "Burning Tree / Rubrix Wines", address: "1040 N Main St, Cottonwood", hours: "Sun–Thu noon–7pm, Fri–Sat noon–10pm", note: "Small-batch boutique, live music weekends" },
              { name: "Tantrum Wines", address: "918 N Main St, Suite C", hours: "Call for hours: 928-634-2266", note: "Boutique local favorite" },
              { name: "Cellar 433 / Odyssey Cellars", address: "909 N Main St, Cottonwood", hours: "Call for hours: 928-852-4002", note: "Unique blends in Old Town" },
            ].map(w => (
              <div key={w.name} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 card-hover">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Wine size={13} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">{w.name}</h4>
                    <p className="font-body text-xs text-white/60 mt-0.5 flex items-center gap-1"><MapPin size={9} /> {w.address}</p>
                    <p className="font-body text-xs text-white/60 mt-0.5 flex items-center gap-1"><Clock size={9} /> {w.hours}</p>
                    {w.note && <p className="font-body text-xs text-gold/80 mt-1 italic">{w.note}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <p className="font-body text-white/80 text-sm mb-3">
              <strong className="text-gold">Pro tip:</strong> Download the <strong className="text-white">Verde Valley Wine Trail Passport App</strong> to check in at each winery and track your tasting journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://vvwinetrail.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-gold/20 hover:bg-gold/30 border border-gold/40 text-gold text-xs font-body font-bold px-4 py-2 rounded-full transition-colors">
                Verde Valley Wine Trail <ExternalLink size={11} />
              </a>
              <a href="https://www.oldtown.org/wineries.html" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-body font-bold px-4 py-2 rounded-full transition-colors">
                Old Town Tasting Rooms <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Day Trips ── */}
      <Section id="daytrips" className="bg-cream">
        <SectionHeading icon={MapPin} title="Day Trips" subtitle="Sedona, Jerome, and beyond — world-class destinations are all within 30 minutes of your front door." />

        {/* Sedona insider tips callout */}
        <div className="mb-8 bg-terracotta/8 border border-terracotta/20 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-terracotta/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Star size={15} className="text-terracotta" />
            </div>
            <div>
              <h4 className="font-display text-base font-semibold text-foreground mb-1">Sedona Insider Tips</h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                <strong>Slide Rock &amp; Crescent Moon:</strong> Go early morning or after 2pm in summer — entry lines can be long mid-day. Creek areas can be slippery and some pools are deeper than they look; extra caution for children and non-swimmers. For shade and creek access, hike the <strong>West Fork Trail</strong> in Oak Creek Canyon. Drive scenic <strong>State Route 89A</strong> toward Flagstaff for roadside picnic pull-offs along the creek. For sunset and stargazing, the <strong>Sedona Airport Overlook</strong> offers panoramic red-rock views and some of the darkest skies in Arizona — the Milky Way is visible on clear nights. Download the <strong>AllTrails app</strong> before you go for trail details, difficulty ratings, and real-time closure status.
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AttractionCard
            img={SEDONA_IMG}
            title="Sedona Red Rocks"
            distance="~20 min"
            description="One of the most photographed landscapes on Earth. Hike Cathedral Rock, Bell Rock, or Devil's Bridge. Explore vortex sites, art galleries, and world-class spas. The Sedona Airport Overlook is the best spot for sunset and Milky Way stargazing on clear nights."
            tags={["Hiking", "Vortex Sites", "Galleries", "Stargazing"]}
            link="https://visitsedona.com"
          />
          <AttractionCard
            img={JEROME_IMG}
            title="Jerome Ghost Town"
            distance="~20 min"
            description="Perched on Cleopatra Hill at 5,000 ft, Jerome was Arizona's wildest copper mining town — largely abandoned when the mines closed, then reborn as a quirky arts community. Don't miss the Jerome Grand Hotel (The Asylum restaurant), the Haunted Hamburger, cobblestone shops, and the Hang Glider Launch overlook for sunset views."
            tags={["Ghost Town", "Art Galleries", "Ghost Tours", "Views"]}
            link="https://www.visitarizona.com/places/cities/jerome"
          />
          <AttractionCard
            img={RAILROAD_IMG}
            title="Verde Canyon Railroad"
            distance="~10 min"
            description="Board a vintage train in nearby Clarkdale for a 4-hour round-trip through the breathtaking Verde Canyon — past towering red-rock pinnacles, ancient ruins, and a 734-foot tunnel carved through solid rock."
            tags={["Scenic Train", "Wildlife", "Canyon Views"]}
            link="https://verdecanyonrr.com"
          />
          <AttractionCard
            img={TUZIGOOT_IMG}
            title="Tuzigoot National Monument"
            distance="~5 min"
            description="Walk among the ruins of a 1,000-year-old Sinagua hilltop pueblo with 110 rooms overlooking the Verde River floodplain. One of the best-preserved prehistoric sites in the Southwest."
            tags={["History", "Archaeology", "National Monument"]}
            link="https://www.nps.gov/tuzi/"
          />
          <AttractionCard
            img={VERDE_VINEYARD_IMG}
            title="Alcantara Vineyards"
            distance="~10 min"
            description="Nestled along the Verde River, Alcantara is your first stop on the Verde Valley Wine Trail. Enjoy tastings with sweeping vineyard views, picnic grounds, and a serene riverside setting."
            tags={["Winery", "Vineyard Views", "Wine Trail"]}
            link="https://alcantaravineyard.com"
          />
          <AttractionCard
            img={OLD_TOWN_IMG}
            title="Old Town Cottonwood"
            distance="Walking / 5 min"
            description="Stroll the historic Main Street lined with wine tasting rooms, farm-to-table restaurants, boutique shops, and antique stores. The walkable heart of the Verde Valley's social scene."
            tags={["Wine Tasting", "Dining", "Shopping", "Walkable"]}
            link="https://www.oldtown.org"
          />
          <AttractionCard
            img={SEDONA_IMG}
            title="Chapel of the Holy Cross"
            distance="~25 min"
            description="An architectural marvel built directly into Sedona's red rocks, the Chapel of the Holy Cross offers not only spiritual solace but sweeping panoramic views of the surrounding canyon landscape. Free entry, open daily."
            tags={["Landmark", "Views", "Architecture", "Free Entry"]}
            link="https://www.chapeloftheholycross.com"
          />
          <AttractionCard
            img={JEROME_IMG}
            title="Tlaquepaque Arts Village"
            distance="~25 min"
            description="A charming Sedona shopping village modeled on a traditional Mexican village, with art galleries, boutiques, and restaurants. Perfect for finding a unique souvenir or enjoying a leisurely afternoon among fountains and archways."
            tags={["Art Galleries", "Shopping", "Restaurants", "Culture"]}
            link="https://www.tlaq.com"
          />
          <AttractionCard
            img={DEAD_HORSE_IMG}
            title="Blazin' M Ranch"
            distance="~5 min"
            description="A beloved Cottonwood institution for family fun — enjoy a chuckwagon dinner, live Western entertainment, games, and activities in a classic Arizona ranch setting. A great evening out for all ages."
            tags={["Family Fun", "Western Entertainment", "Dinner Show"]}
            link="https://blazinm.com"
          />
        </div>
      </Section>

      {/* ── Outdoors ── */}
      <Section id="outdoors" className="bg-sand">
        <SectionHeading icon={Mountain} title="Outdoors" subtitle="The Verde Valley is your playground — hiking, kayaking, birding, and stargazing await." />
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <div className="space-y-2">
            <img src={DEAD_HORSE_IMG} alt="Dead Horse Ranch State Park" className="rounded-2xl shadow-lg w-full h-56 object-cover" />
            <div className="grid grid-cols-2 gap-2">
              <img src={OUTDOOR_IMG} alt="Outdoor area" className="rounded-xl w-full h-32 object-cover" />
              <img src={LIVING2_IMG} alt="Property outdoor living" className="rounded-xl w-full h-32 object-cover" />
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">Dead Horse Ranch State Park</h3>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Just minutes from your door, this 423-acre park along the Verde River offers 20+ miles of trails, canoe and kayak rentals, fishing lagoons, and some of the best bird-watching in Arizona. The riparian corridor is a lush oasis in the desert.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { icon: TreePine, text: "20+ miles of trails" },
                { icon: Droplets, text: "Verde River kayaking" },
                { icon: Star, text: "World-class birding" },
                { icon: Mountain, text: "Camping available" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={14} className="text-sage flex-shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
            <div className="font-body text-sm text-muted-foreground bg-white rounded-lg p-3 border border-border">
              <strong>Hours:</strong> Summer 6am–8pm · Fall/Winter 7am–6pm<br />
              <strong>Entry:</strong> $10/vehicle (1 person) · $20/vehicle (2–4 people)<br />
              <strong>Address:</strong> 675 Dead Horse Ranch Rd, Cottonwood
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Droplets, title: "Verde River Kayaking", body: "Guided kayak tours available from Cottonwood. Drift through canyon walls and native wildlife corridors on Arizona's most scenic river. Canoe and kayak rentals also available at Dead Horse Ranch State Park." },
            { icon: Mountain, title: "Local Hikes", body: "Easy strolls: Jail Trail River Walk (near Old Town) and Cliff Rose Trail off Mingus Ave. For adventure: Parsons Trail and The Crack are stunning but strenuous — bring extra water and start early in summer." },
            { icon: Star, title: "Stargazing", body: "Cottonwood's high desert elevation and low light pollution make it a premier stargazing destination. The Verde Canyon Railroad runs Saturday Starlight Adventures, and the Sedona Airport Overlook is spectacular on clear nights." },
            { icon: Train, title: "Verde Canyon Railroad", body: "A 4-hour round-trip scenic train ride through the untouched Verde Canyon — bald eagles, ancient ruins, and 734-ft tunnel. Departs from Clarkdale. Book early; seasonal events sell out weeks in advance." },
          ].map(tip => <TipCard key={tip.title} {...tip} />)}
        </div>
      </Section>

      {/* ── Antiques ── */}
      <Section id="antiques">
        <SectionHeading icon={ShoppingBag} title="Antiques & Shopping" subtitle="Old Town Cottonwood is a treasure hunter's paradise — rare finds, vintage gems, and local artisan goods line Main Street." />
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Old Town Antique District</h3>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              All of Old Town's antique shops are clustered within a 2-block radius on N Main Street — you can easily browse them all in an afternoon. From Victorian furniture to Native American art, mid-century collectibles to hand-crafted jewelry, there's something for every taste and budget.
            </p>
            <div className="space-y-3">
              {[
                { name: "Simply Amazing Marketplace", desc: "Tripadvisor's #1 rated antique destination in Cottonwood — eclectic mix of antiques, Mexican imports, and folk art.", addr: "N Main St, Old Town" },
                { name: "J&J Antiques", desc: "Curated selection of quality antiques and collectibles.", addr: "796 N Main St · 928-202-4495" },
                { name: "Papillon II", desc: "Charming antique shop with French and European influences.", addr: "1004 N Main St · 928-649-1649" },
                { name: "Bohemian Artifacts", desc: "Eclectic bohemian finds and one-of-a-kind vintage pieces.", addr: "725 N Main St · Open 11am–7pm" },
                { name: "Larry's Antiques & Things", desc: "A Cottonwood institution — come take home a piece of local history.", addr: "Mon–Sat 10am–5pm, Sun 10am–4pm" },
                { name: "Green Shed Antiques", desc: "Beloved local shop with a wide variety of vintage goods.", addr: "Old Town Cottonwood" },
              ].map(({ name, desc, addr }) => (
                <div key={name} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                  <div className="w-7 h-7 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShoppingBag size={13} className="text-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-foreground">{name}</h4>
                    <p className="font-body text-xs text-muted-foreground">{desc}</p>
                    <p className="font-body text-xs text-terracotta mt-0.5 flex items-center gap-1"><MapPin size={9} /> {addr}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://visitcottonwoodaz.org/az/old-town/shop/antiques/" target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-body text-terracotta hover:underline font-bold">
              Full antiques directory <ExternalLink size={12} />
            </a>
          </div>
          <div className="order-1 md:order-2">
            <img src={OLD_TOWN_IMG} alt="Old Town Cottonwood at night" className="rounded-2xl shadow-lg w-full h-96 object-cover" />
            <p className="font-body text-xs text-muted-foreground text-center mt-2 italic">Old Town Cottonwood — vibrant by day and night</p>
          </div>
        </div>
      </Section>

      {/* ── Dining ── */}
      <Section id="dining" className="bg-sand">
        <SectionHeading icon={Utensils} title="Dining" subtitle="From farm-to-table bistros to beloved local diners — Old Town Cottonwood's food scene punches well above its size." />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-1">Local Favorites</h3>
            <p className="font-body text-xs text-muted-foreground mb-4">Tried-and-true spots recommended by locals</p>
            {[
              { name: "Crema Craft Kitchen & Bar", type: "Breakfast / Brunch", note: "Cottonwood's most beloved breakfast spot — expect a line on weekends. Worth every minute." },
              { name: "Old Town Red Rooster Cafe", type: "Lunch / Casual", note: "Charming local cafe perfect for a relaxed lunch in the heart of Old Town." },
              { name: "Nic's Italian Steak & Crab House", type: "Dinner / Upscale", note: "A throwback fine dining experience with exceptional steaks and fresh seafood." },
              { name: "Whitehouse Wood Fired Grill", type: "Dinner / Wood-Fired", note: "Artisan wood-fired dishes in a warm, rustic setting — a local favorite for dinner." },
              { name: "Eden", type: "Dinner / Farm-to-Table", note: "Seasonal, locally sourced menu in a beautiful garden setting. One of Cottonwood's most celebrated dining experiences." },
              { name: "Bing's Burger Station", type: "Casual / Burgers", note: "Classic burgers and milkshakes — a Cottonwood institution for a quick, satisfying meal." },
              { name: "Juanita's Mexican Food", type: "Mexican", note: "Authentic, no-frills Mexican food beloved by locals. Great value and generous portions." },
            ].map(d => <DiningCard key={d.name} {...d} />)}
          </div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-1">Wine & Dine</h3>
            <p className="font-body text-xs text-muted-foreground mb-4">Tasting rooms with full food menus</p>
            {[
              { name: "Merkin Vineyards Hilltop Trattoria", type: "Wine + Italian", note: "Hilltop views, wood-fired dishes, and exceptional Verde Valley wines. A must-visit experience." },
              { name: "Da Vines Vineyard Bistro", type: "Wine + French Bistro", note: "Elegant French bistro menu paired with handcrafted Page Springs wines. Reservations recommended." },
              { name: "The Tavern Grille", type: "American / Gastropub", note: "A true gem in Old Town — hearty burgers, artisan pizzas, and vibrant salads with a modern touch." },
              { name: "Aqui Arizona Kitchen & Agave Bar", type: "Southwestern", note: "Creative Southwestern cuisine with an impressive agave spirits selection." },
              { name: "DA Ranch", type: "Steakhouse / Western", note: "Classic Western steakhouse with hearty cuts and a true Arizona ranch atmosphere." },
              { name: "Adriana's Mexican Food", type: "Mexican", note: "Beloved local Mexican restaurant with authentic flavors and a warm, welcoming atmosphere." },
            ].map(d => <DiningCard key={d.name} {...d} />)}
          </div>
        </div>
      </Section>

      {/* ── Guest Tips ── */}
      <Section id="tips">
        <SectionHeading icon={Star} title="Guest Tips" subtitle="Everything you need to know to make the most of your stay in the Verde Valley." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {[
            { icon: Wine, title: "Sip & Stroll Events", body: "Old Town hosts regular Sip & Stroll events where you can sample wines from multiple tasting rooms with a single ticket. Check oldtown.org/events for the current schedule. Page Springs Cellars opens at noon — arrive early on weekends to avoid a wait." },
            { icon: MapPin, title: "Getting Around", body: "A car is recommended for day trips to Sedona and Jerome. Old Town Cottonwood is very walkable — most tasting rooms and restaurants are within a 5-minute stroll. Download the AllTrails app before hiking for trail details, difficulty ratings, and real-time closure status." },
            { icon: Mountain, title: "Best Time to Visit", body: "Spring (March–May) and Fall (September–November) offer the most comfortable temperatures. Summers are warm but evenings cool down beautifully at Cottonwood's 3,300 ft elevation. For strenuous hikes like Parsons Trail or The Crack, start early and bring extra water in summer." },
            { icon: Landmark, title: "National Parks Pass", body: "If you plan to visit Tuzigoot and Montezuma Castle, consider an America the Beautiful Annual Pass ($80) — it covers all NPS sites and pays for itself quickly. Fossil Creek requires a free permit (recreation.gov) — book well in advance." },
            { icon: Train, title: "Book the Railroad Early", body: "Verde Canyon Railroad tickets sell out weeks in advance, especially for seasonal events like the Christmas Journey and Uncorked Wine Festival. Book at verdecanyonrr.com. Saturday Starlight Adventures are especially popular." },
            { icon: Phone, title: "Emergency Contacts", body: "Cottonwood Police: 928-634-4246 · Verde Valley Medical Center: 928-639-6000 · Nearest urgent care: 549 S Main St, Cottonwood. Wildlife note: coyotes, javelina, and rattlesnakes are present in the area — keep a respectful distance." },
          ].map(tip => <TipCard key={tip.title} {...tip} />)}
        </div>

        {/* Distance reference */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-display text-xl font-semibold text-foreground mb-4 text-center">Distance Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { place: "Old Town Cottonwood", dist: "~5 min drive" },
              { place: "Sedona", dist: "~20 min drive" },
              { place: "Jerome", dist: "~20 min drive" },
              { place: "Verde Canyon Railroad", dist: "~10 min drive" },
              { place: "Tuzigoot Monument", dist: "~5 min drive" },
              { place: "Dead Horse Ranch", dist: "~5 min drive" },
              { place: "Prescott", dist: "~1 hr drive" },
              { place: "Flagstaff", dist: "~1 hr drive" },
            ].map(({ place, dist }) => (
              <div key={place} className="text-center p-3 bg-sand rounded-lg">
                <p className="font-body text-xs text-muted-foreground">{place}</p>
                <p className="font-display text-sm font-semibold text-terracotta mt-1">{dist}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="bg-charcoal text-white py-12">
        <div className="container text-center">
          <div className="flex flex-col items-center gap-3 mb-4">
            <img src={LOGO_IMG} alt="Grapevine Stays" className="h-14 w-auto object-contain" style={{filter: 'brightness(0) invert(1)', opacity: 0.85}} />
            <p className="font-body text-xs text-white/60">609 W Fir Street · Cottonwood, AZ 86326</p>
          </div>
          <p className="font-body text-sm text-white/60 max-w-lg mx-auto leading-relaxed mb-6">
            We hope this guide helps you discover the magic of the Verde Valley. Pour yourself a glass, step outside, and savor every moment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-body text-white/50">
            <a href="https://visitcottonwoodaz.org" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Visit Cottonwood AZ</a>
            <span>·</span>
            <a href="https://vvwinetrail.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Verde Valley Wine Trail</a>
            <span>·</span>
            <a href="https://verdecanyonrr.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Verde Canyon Railroad</a>
            <span>·</span>
            <a href="https://www.nps.gov/tuzi/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Tuzigoot NPS</a>
          </div>
          <p className="font-body text-xs text-white/30 mt-6">
            Guest Guidebook · 609 W Fir St, Cottonwood, AZ · Updated 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
