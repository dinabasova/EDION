export default function TeachersSection() {
    return (
      <div>
        <h2 className="text-3xl font-semibold">Our Teachers</h2>
  
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {["Teacher A", "Teacher B", "Teacher C"].map((name, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-[#3b3c55]/10"
            >
              <div className="h-40 bg-[#3b3c55]/20 rounded-xl mb-4"></div>
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm text-[#3b3c55]/70">Professional Mentor</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  