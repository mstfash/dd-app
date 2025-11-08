import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sage-600 text-white py-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4 opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <img src="/Stars-1.svg" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-display font-bold mb-4 text-peach-200">
              About the Tournament
            </h3>
            <p className="text-sage-100">
              Powered by 3BONT's cutting-edge tournament management technology,
              ZED brings you the biggest Ramadan tournament in Egypt. Our
              innovative software solutions ensure a seamless experience for
              athletes and organizers alike.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-display font-bold mb-4 text-peach-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#register"
                  className="text-sage-100 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-peach-400 rounded-full group-hover:scale-150 transition-transform" />
                  Register Now
                </a>
              </li>
              <li>
                <a
                  href="#tournament-details"
                  className="text-sage-100 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-peach-400 rounded-full group-hover:scale-150 transition-transform" />
                  Rules & Regulations
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sage-100 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-peach-400 rounded-full group-hover:scale-150 transition-transform" />
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-bold mb-4 text-peach-200">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sage-100">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-peach-400" />
                <span>+20 100 440 1806</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-peach-400" />
                <span>info@3bont.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-peach-400 mt-1" />
                <span>
                  ZED Sports Complex,
                  <br />
                  Sheikh Zayed City
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-bold mb-4 text-peach-200">
              Follow Us
            </h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.facebook.com/OraEgypt1/?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sage-500 flex items-center justify-center hover:bg-peach-400 transition-colors group"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/oraegypt?igshid=YmMyMTA2M2Y="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sage-500 flex items-center justify-center hover:bg-peach-400 transition-colors group"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com/@oraegypt4434"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sage-500 flex items-center justify-center hover:bg-peach-400 transition-colors group"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="w-fiull max-w-2xl mx-auto text-center font-bold">
          <p>
            تم إخطار جهاز حماية المستهلك بالمسابقة برقم 56 لسنة 2025 بتاريخ
            23/2/2025 طبقاً لأحكام قانون حماية المستهلك رقم 181 لسنة 2018
            ولائحته التنفيذية
          </p>
        </div>
        <div className="text-center pt-8 border-t border-sage-500/30">
          <p className="text-sage-200">
            © 2025 3BONT Sports Development Company. All rights reserved. |
            Delivering innovative sports technology solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
