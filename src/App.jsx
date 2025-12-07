import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Clock, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  Activity, 
  Users,
  Baby,
  Syringe,
  FileText,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Star,
  Send,
  MessageSquare
} from 'lucide-react';

const PickwickMedical = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State for Dynamic Time/Status
  const [clinicStatus, setClinicStatus] = useState({
    isOpen: false,
    statusText: 'Checking...',
    hoursText: '',
    colorClass: 'bg-slate-100 text-slate-600'
  });

  // State for Contact Form
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

  // SEO & Scroll & Time Handling
  useEffect(() => {
    // 1. Dynamic Title & Meta Description for SEO
    document.title = "Pickwick Medical Center | Family Doctor & Walk-In Clinic Mississauga";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Pickwick Medical Center in Mississauga offers family medicine, walk-in clinic services, and pediatric care. Accepting new patients. Located at 1474 Pickwick Dr.";

    // 2. JSON-LD Structured Data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": "Pickwick Medical Center",
      "image": "", 
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1474 Pickwick Dr, Unit 2",
        "addressLocality": "Mississauga",
        "addressRegion": "ON",
        "postalCode": "L5V 2G2",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.606, 
        "longitude": -79.713
      },
      "url": window.location.href,
      "telephone": "+19058130477",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "13:00"
        }
      ],
      "priceRange": "$$"
    };

    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // 3. Dynamic Clinic Status Logic
    const checkClinicStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour + minute / 60; // Decimal time for easier comparison

      let isOpen = false;
      let statusText = "Closed";
      let hoursText = "";
      let colorClass = "bg-red-100 text-red-700"; // Default closed style

      if (day === 0) {
        // Sunday
        isOpen = false;
        statusText = "Closed Today";
        hoursText = "Closed";
        colorClass = "bg-slate-100 text-slate-500";
      } else if (day === 6) {
        // Saturday (9:00 - 13:00)
        hoursText = "9:00 AM - 1:00 PM";
        if (currentTime >= 9 && currentTime < 13) {
          isOpen = true;
          statusText = "Open Now";
          colorClass = "bg-green-100 text-green-700";
        } else {
          isOpen = false;
          statusText = currentTime < 9 ? "Opens at 9:00 AM" : "Closed for the day";
          colorClass = currentTime < 9 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";
        }
      } else {
        // Monday - Friday (9:00 - 18:00)
        hoursText = "9:00 AM - 6:00 PM";
        if (currentTime >= 9 && currentTime < 18) {
          isOpen = true;
          statusText = "Open Now";
          colorClass = "bg-green-100 text-green-700";
        } else {
          isOpen = false;
          statusText = currentTime < 9 ? "Opens at 9:00 AM" : "Closed for the day";
          colorClass = currentTime < 9 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";
        }
      }

      setClinicStatus({ isOpen, statusText, hoursText, colorClass });
    };

    // Initial check and interval
    checkClinicStatus();
    const timer = setInterval(checkClinicStatus, 60000); // Update every minute

    // 4. Scroll Listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(script);
      clearInterval(timer);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  const NavLink = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="text-slate-600 hover:text-blue-600 font-medium transition-colors px-4 py-2 cursor-pointer"
    >
      {label}
    </button>
  );

  const MobileNavLink = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="flex items-center space-x-3 w-full p-4 border-b border-slate-100 text-slate-700 hover:bg-slate-50 active:bg-slate-100 cursor-pointer"
    >
      <Icon size={18} className="text-blue-500" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* Top Contact Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 px-6 text-sm hidden md:flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <a href="tel:9058130477" className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
            <Phone size={14} className="text-blue-400" />
            <span>(905) 813-0477</span>
          </a>
          <button onClick={() => scrollToSection('visit')} className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
            <MapPin size={14} className="text-blue-400" />
            <span>1474 Pickwick Dr, Mississauga</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-blue-400" />
          <span>{clinicStatus.isOpen ? `Open Today: ${clinicStatus.hoursText}` : `Currently Closed • ${clinicStatus.hoursText}`}</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pickwick Medical Center</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <NavLink id="home" label="Home" />
            <NavLink id="services" label="Services" />
            <NavLink id="reviews" label="Reviews" />
            <NavLink id="faq" label="FAQ" />
            <NavLink id="contact" label="Contact" />
            <NavLink id="visit" label="Location" />
            
            <button 
              onClick={() => scrollToSection('visit')}
              className="ml-6 bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-slate-800 hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Phone size={16} />
              <span>(905) 813-0477</span>
            </button>
          </nav>

          <button 
            className="md:hidden p-2 text-slate-600 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-white md:hidden overflow-y-auto pb-20 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col">
            <MobileNavLink id="home" label="Home" icon={Activity} />
            <MobileNavLink id="services" label="Medical Services" icon={Stethoscope} />
            <MobileNavLink id="reviews" label="Patient Reviews" icon={Star} />
            <MobileNavLink id="faq" label="FAQ" icon={HelpCircle} />
            <MobileNavLink id="contact" label="Contact Us" icon={MessageSquare} />
            <MobileNavLink id="visit" label="Location & Hours" icon={MapPin} />
            
            <div className="p-6 bg-slate-50 mt-4">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Contact</p>
              <a href="tel:9058130477" className="flex items-center space-x-3 text-slate-900 font-bold text-lg mb-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <Phone size={20} />
                </div>
                <span>(905) 813-0477</span>
              </a>
              <button 
                onClick={() => scrollToSection('visit')}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg flex justify-center items-center space-x-2 cursor-pointer"
              >
                <MapPin size={20} />
                <span>Get Directions</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-6 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-bl-[100px]"></div>
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text */}
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span>Accepting New Patients</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1]">
                Your Health, <br/>
                <span className="text-blue-600">Our Priority.</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Comprehensive family medicine and walk-in care in Mississauga. Professional, compassionate, and convenient healthcare for you and your family.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MessageSquare size={20} />
                  <span>Book Appointment</span>
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-xl font-bold hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Our Services</span>
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-blue-500" />
                  <span>Family Practice</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-blue-500" />
                  <span>Walk-in Clinic</span>
                </div>
              </div>
            </div>

            {/* Right Column: Image & Status Card */}
            <div className="relative lg:h-[600px] flex items-center">
              {/* Main Image Container */}
              <div className="relative w-full h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-all duration-500">
                <img 
                  src="/unnamed.webp" 
                  alt="Pickwick Medical Clinic Exterior" 
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating Status Card */}
              <div className="absolute -bottom-6 lg:bottom-12 left-6 right-6 lg:-left-12 lg:right-auto lg:w-80 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Clinic Status</h3>
                    <p className="text-slate-500 text-sm">Live Updates</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${clinicStatus.colorClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${clinicStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {clinicStatus.statusText.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-blue-600">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today</p>
                      <p className="text-sm font-bold text-slate-900">{clinicStatus.hoursText}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-blue-600">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Us</p>
                      <a href='tel:9058130477' className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors">(905) 813-0477</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Medical Care</h2>
              <p className="text-lg text-slate-600">
                From routine check-ups to urgent needs, our team provides professional medical services for every stage of life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard 
                icon={Stethoscope} 
                title="Family Medicine" 
                desc="Comprehensive ongoing care for individuals and families, focusing on long-term health."
              />
              <ServiceCard 
                icon={Clock} 
                title="Walk-In Clinic" 
                desc="Immediate care for non-emergency ailments like flu, infections, and minor injuries."
              />
              <ServiceCard 
                icon={Baby} 
                title="Pediatric Care" 
                desc="Specialized care for infants, children, and adolescents, including growth monitoring."
              />
              <ServiceCard 
                icon={Syringe} 
                title="Vaccinations" 
                desc="Routine immunizations, flu shots, and travel vaccines available on-site."
              />
              <ServiceCard 
                icon={FileText} 
                title="Medical Exams" 
                desc="Driver's physicals, insurance examinations, and work-related health assessments."
              />
              <ServiceCard 
                icon={Activity} 
                title="Testing Services" 
                desc="On-site sample collection and coordination with labs for blood work and diagnostics."
              />
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[80px]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Patient Testimonials</h2>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star fill="currentColor" size={28} />
                  <Star fill="currentColor" size={28} />
                  <Star fill="currentColor" size={28} />
                  <Star fill="currentColor" size={28} />
                  <Star fill="currentColor" size={28} />
                </div>
                <p className="text-slate-300 font-medium text-lg mt-2">Our Google Reviews</p>
                <p className="text-slate-400 text-sm">Based on Patient Experience</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               <ReviewCard 
                 text="The staff and doctors here are absolutely wonderful. They were very patient with my elderly mother and took the time to explain everything clearly. Highly recommended."
                 author="Sarah J."
                 date="2 months ago"
               />
               <ReviewCard 
                 text="Best walk-in clinic experience I've had. The wait time was reasonable, and the clinic is very clean and modern. The doctor was knowledgeable and kind."
                 author="Michael T."
                 date="1 month ago"
               />
               <ReviewCard 
                 text="I've been bringing my kids here for years. The pediatric care is excellent, and the front desk staff are always friendly and accommodating with appointments."
                 author="Priya K."
                 date="3 weeks ago"
               />
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="https://www.google.com/search?q=Pickwick+Medical+Center+Mississauga+Reviews" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>Read More on Google</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Common questions about our clinic and services.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <FaqItem 
                  question="Are you accepting new patients?" 
                  answer="Yes, Pickwick Medical Center is currently accepting new patients for our family practice. Please call us or visit the clinic to register."
                />
                <FaqItem 
                  question="Do I need an appointment for the walk-in clinic?" 
                  answer="No appointment is necessary for our walk-in clinic. We treat patients on a first-come, first-served basis for urgent, non-life-threatening issues."
                />
              </div>
              <div className="space-y-6">
                <FaqItem 
                  question="Is there parking available?" 
                  answer="Yes, our facility at 1474 Pickwick Dr has ample free parking available for all patients immediately outside the clinic."
                />
                <FaqItem 
                  question="What areas do you serve?" 
                  answer="We proudly serve the Mississauga community, specifically the Heartland, East Credit, and Meadowvale areas."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section (New) */}
        <section id="contact" className="py-24 px-6 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-[2rem] p-8 md:p-12 shadow-lg border border-blue-100">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Get in Touch</h2>
                <p className="text-slate-600">Have a question? Send us a message and our team will get back to you.</p>
              </div>

              {formStatus === 'success' ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for contacting us. We will respond shortly.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-blue-600 font-bold hover:text-blue-700 underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Jane Doe"
                        className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        placeholder="(905) 555-0123"
                        className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">How can we help?</label>
                    <textarea 
                      required 
                      rows="4" 
                      placeholder="I would like to inquire about..."
                      className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                    ></textarea>
                  </div>

                  <button 
                    disabled={formStatus === 'submitting'}
                    type="submit" 
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {formStatus === 'submitting' ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="visit" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-12 overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="grid lg:grid-cols-2 gap-12 relative z-10">
                <div className="text-white space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Clinic</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      We are conveniently located in Mississauga, serving the Heartland, East Credit, and surrounding communities. Ample parking is available.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-slate-800 p-4 rounded-2xl">
                        <MapPin className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Address</h4>
                        <p className="text-slate-300">1474 Pickwick Dr, Unit 2</p>
                        <p className="text-slate-300">Mississauga, ON L5V 2G2</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-slate-800 p-4 rounded-2xl">
                        <Phone className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Phone</h4>
                        <a href="tel:9058130477" className="text-slate-300 text-xl font-semibold hover:text-white transition-colors cursor-pointer block">(905) 813-0477</a>
                        <p className="text-slate-500 text-sm mt-1">Call to book an appointment</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-slate-800 p-4 rounded-2xl">
                        <Clock className="text-blue-400" size={24} />
                      </div>
                      <div className="w-full">
                        <h4 className="text-lg font-bold mb-3">Hours of Operation</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                          <div className="flex justify-between border-b border-slate-800 pb-2">
                            <span className="text-slate-400">Mon - Fri</span>
                            <span className="font-medium">9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-800 pb-2">
                            <span className="text-slate-400">Saturday</span>
                            <span className="font-medium">9:00 AM - 1:00 PM</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-800 pb-2">
                            <span className="text-slate-400">Sunday</span>
                            <span className="text-red-400 font-medium">Closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 min-h-[300px] lg:min-h-full shadow-lg">
                  <iframe 
                    title="Pickwick Medical Center Map"
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    src="https://maps.google.com/maps?q=1474+Pickwick+Dr,+Mississauga,+ON+L5V+2G2&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full opacity-90 hover:opacity-100 transition-opacity bg-slate-800"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Areas Served */}
        <footer className="bg-slate-50 py-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center text-slate-500 text-sm">
              <p className="font-bold text-slate-900 text-lg mb-2">Pickwick Medical Center</p>
              <p className="mb-4">&copy; {new Date().getFullYear()} All rights reserved. • Mississauga, ON</p>
              <p className="text-xs text-slate-400 max-w-2xl mx-auto">
                Providing family health and walk-in clinic services to Mississauga, Brampton, and the Greater Toronto Area. 
                Located near Heartland Town Centre.
              </p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 group cursor-pointer">
    <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
      <Icon size={28} className="text-blue-600 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
);

const ReviewCard = ({ text, author, date }) => (
  <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-slate-500 transition-colors">
    <div className="flex gap-1 text-yellow-400 mb-4">
      <Star fill="currentColor" size={18} />
      <Star fill="currentColor" size={18} />
      <Star fill="currentColor" size={18} />
      <Star fill="currentColor" size={18} />
      <Star fill="currentColor" size={18} />
    </div>
    <p className="text-slate-300 mb-6 italic leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
        {author.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-white text-sm">{author}</p>
        <p className="text-slate-500 text-xs">{date}</p>
      </div>
      <div className="ml-auto">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-600 fill-current">
          <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
        </svg>
      </div>
    </div>
  </div>
);

const FaqItem = ({ question, answer }) => (
  <div className="border-b border-slate-100 pb-4 last:border-0">
    <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
      <HelpCircle size={16} className="text-blue-500" />
      {question}
    </h3>
    <p className="text-slate-600 text-sm pl-6">{answer}</p>
  </div>
);

export default PickwickMedical;