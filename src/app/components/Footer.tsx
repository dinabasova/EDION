export default function Footer() {
    return (
      <footer className="bg-[#3b3c55] text-[#fffaef]/80 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-3">
            <p className="text-lg font-semibold">Edionaz</p>
            <select className="bg-[#fffaef]/10 p-2 rounded text-sm">
              <option value="az">AZ</option>
              <option value="en">EN</option>
            </select>
          </div>
  
          <div className="text-sm space-y-2">
            <p>Telefon: +994 10 712 78 88
            </p>
            <p>Email: learnedionaz@gmail.com</p>
            <p>Join us on Telegram</p>
          </div>
        </div>
      </footer>
    );
  }
  