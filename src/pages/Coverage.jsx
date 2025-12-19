import { useState } from "react";
import { Check, MapPin, Package } from "lucide-react";

const Coverage = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Real coverage data from your JSON
  const coverageData = [
    { region: "Dhaka", district: "Dhaka", lat: 23.8103, lon: 90.4125, areas: ["Uttara", "Dhanmondi", "Mirpur", "Mohammadpur"] },
    { region: "Dhaka", district: "Faridpur", lat: 23.6, lon: 89.8333, areas: ["Goalanda", "Boalmari", "Bhanga"] },
    { region: "Dhaka", district: "Gazipur", lat: 23.9999, lon: 90.4203, areas: ["Tongi", "Kaliakair", "Sreepur"] },
    { region: "Dhaka", district: "Gopalganj", lat: 23.0052, lon: 89.8266, areas: ["Tungipara", "Kotalipara", "Kashiani"] },
    { region: "Dhaka", district: "Kishoreganj", lat: 24.426, lon: 90.7829, areas: ["Bajitpur", "Kuliarchar", "Pakundia"] },
    { region: "Dhaka", district: "Madaripur", lat: 23.17, lon: 90.2, areas: ["Rajoir", "Kalkini", "Shibchar"] },
    { region: "Dhaka", district: "Manikganj", lat: 23.8617, lon: 89.9767, areas: ["Saturia", "Shivalaya", "Ghior"] },
    { region: "Dhaka", district: "Munshiganj", lat: 23.55, lon: 90.5305, areas: ["Sreenagar", "Lohajang", "Sirajdikhan"] },
    { region: "Dhaka", district: "Narayanganj", lat: 23.62, lon: 90.5, areas: ["Fatullah", "Siddhirganj", "Rupganj"] },
    { region: "Dhaka", district: "Narsingdi", lat: 23.9226, lon: 90.7156, areas: ["Palash", "Belabo", "Raipura"] },
    { region: "Dhaka", district: "Rajbari", lat: 23.7576, lon: 89.65, areas: ["Pangsha", "Kalukhali", "Baliakandi"] },
    { region: "Dhaka", district: "Shariatpur", lat: 23.22, lon: 90.4308, areas: ["Zajira", "Naria", "Gosairhat"] },
    { region: "Dhaka", district: "Tangail", lat: 24.25, lon: 89.92, areas: ["Delduar", "Ghatail", "Kalihati"] },
    { region: "Chattogram", district: "Chattogram", lat: 22.3569, lon: 91.8123, areas: ["Pahartali", "Kotwali", "Halishahar"] },
    { region: "Chattogram", district: "Cox's Bazar", lat: 21.4272, lon: 92.0165, areas: ["Teknaf", "Ukhia", "Chakaria"] },
    { region: "Chattogram", district: "Cumilla", lat: 23.4573, lon: 91.1809, areas: ["Laksam", "Debidwar", "Chandina"] },
    { region: "Chattogram", district: "Brahmanbaria", lat: 23.9571, lon: 91.1116, areas: ["Nabinagar", "Ashuganj", "Sarail"] },
    { region: "Chattogram", district: "Chandpur", lat: 23.2333, lon: 90.85, areas: ["Haimchar", "Matlab", "Shahrasti"] },
    { region: "Chattogram", district: "Feni", lat: 23.0167, lon: 91.4, areas: ["Parshuram", "Daganbhuiyan"] },
    { region: "Chattogram", district: "Khagrachari", lat: 23.1, lon: 91.9667, areas: ["Ramgarh", "Mahalchari"] },
    { region: "Chattogram", district: "Lakshmipur", lat: 22.9444, lon: 90.8415, areas: ["Raipur", "Ramganj"] },
    { region: "Chattogram", district: "Noakhali", lat: 22.8245, lon: 91.0995, areas: ["Begumganj", "Senbagh"] },
    { region: "Chattogram", district: "Rangamati", lat: 22.65, lon: 92.2, areas: ["Baghaichhari", "Kaptai"] },
    { region: "Chattogram", district: "Bandarban", lat: 22.1958, lon: 92.2186, areas: ["Thanchi", "Lama"] },
    { region: "Sylhet", district: "Sylhet", lat: 24.8949, lon: 91.8662, areas: ["Zindabazar", "Ambarkhana", "Dargah Gate"] },
    { region: "Sylhet", district: "Moulvibazar", lat: 24.4826, lon: 91.7832, areas: ["Sreemangal", "Kamalganj"] },
    { region: "Sylhet", district: "Habiganj", lat: 24.3745, lon: 91.4026, areas: ["Shaistaganj", "Madhabpur"] },
    { region: "Sylhet", district: "Sunamganj", lat: 25.0658, lon: 91.395, areas: ["Jagannathpur", "Chhatak"] },
    { region: "Rangpur", district: "Rangpur", lat: 25.746, lon: 89.2752, areas: ["Jahaj Company", "Mahiganj"] },
    { region: "Rangpur", district: "Dinajpur", lat: 25.6275, lon: 88.6414, areas: ["Birampur", "Fulbari"] },
    { region: "Rangpur", district: "Thakurgaon", lat: 26.0333, lon: 88.466, areas: ["Pirganj", "Ranisankail"] },
    { region: "Rangpur", district: "Panchagarh", lat: 26.3411, lon: 88.5658, areas: ["Tetulia", "Boda"] },
    { region: "Rangpur", district: "Nilphamari", lat: 25.931, lon: 88.856, areas: ["Saidpur", "Domar"] },
    { region: "Rangpur", district: "Lalmonirhat", lat: 25.9167, lon: 89.1662, areas: ["Hatibandha", "Patgram"] },
    { region: "Rangpur", district: "Kurigram", lat: 25.8054, lon: 89.65, areas: ["Nageshwari", "Bhurungamari"] },
    { region: "Rangpur", district: "Gaibandha", lat: 25.3288, lon: 89.5418, areas: ["Gobindaganj", "Sundarganj"] },
    { region: "Khulna", district: "Khulna", lat: 22.8456, lon: 89.5672, areas: ["Sonadanga", "Khalishpur", "Daulatpur"] },
    { region: "Khulna", district: "Jessore", lat: 23.17, lon: 89.2167, areas: ["Chowgachha", "Bagharpara"] },
    { region: "Khulna", district: "Satkhira", lat: 22.7085, lon: 89.0809, areas: ["Tala", "Assasuni"] },
    { region: "Khulna", district: "Bagerhat", lat: 22.6516, lon: 89.7926, areas: ["Mongla", "Rampal"] },
    { region: "Khulna", district: "Magura", lat: 23.4853, lon: 89.4194, areas: ["Sreepur", "Mohammadpur"] },
    { region: "Khulna", district: "Narail", lat: 23.1667, lon: 89.5, areas: ["Lohagara", "Kalia"] },
    { region: "Khulna", district: "Jhenaidah", lat: 23.5333, lon: 89.1833, areas: ["Harinakunda", "Shailkupa"] },
    { region: "Khulna", district: "Chuadanga", lat: 23.64, lon: 88.85, areas: ["Alamdanga", "Damurhuda"] },
    { region: "Khulna", district: "Meherpur", lat: 23.7623, lon: 88.6318, areas: ["Mujibnagar", "Gangni"] },
    { region: "Khulna", district: "Kushtia", lat: 23.9013, lon: 89.122, areas: ["Kumarkhali", "Khoksa"] },
    { region: "Rajshahi", district: "Rajshahi", lat: 24.3745, lon: 88.6087, areas: ["Boalia", "Rajpara", "Motihar"] },
    { region: "Rajshahi", district: "Natore", lat: 24.4167, lon: 89, areas: ["Baraigram", "Bagatipara"] },
    { region: "Rajshahi", district: "Naogaon", lat: 24.8236, lon: 88.93, areas: ["Manda", "Sapahar"] },
    { region: "Rajshahi", district: "Chapainawabganj", lat: 24.5962, lon: 88.27, areas: ["Shibganj", "Bholahat"] },
    { region: "Rajshahi", district: "Pabna", lat: 24.0037, lon: 89.2331, areas: ["Ishwardi", "Bera"] },
    { region: "Rajshahi", district: "Sirajganj", lat: 24.45, lon: 89.7167, areas: ["Ullapara", "Kazipur"] },
    { region: "Rajshahi", district: "Joypurhat", lat: 25.0953, lon: 89.0412, areas: ["Akkelpur", "Kalai"] },
    { region: "Rajshahi", district: "Bogura", lat: 24.85, lon: 89.37, areas: ["Sariakandi", "Sonatola"] },
    { region: "Barisal", district: "Barisal", lat: 22.7, lon: 90.3667, areas: ["Band Road", "Cox's Road"] },
    { region: "Barisal", district: "Bhola", lat: 22.685, lon: 90.6311, areas: ["Borhanuddin", "Tazumuddin"] },
    { region: "Barisal", district: "Patuakhali", lat: 22.35, lon: 90.3333, areas: ["Kalapara", "Mirzaganj"] },
    { region: "Barisal", district: "Pirojpur", lat: 22.5833, lon: 89.975, areas: ["Mathbaria", "Bhandaria"] },
    { region: "Barisal", district: "Barguna", lat: 22.1667, lon: 90.1167, areas: ["Amtali", "Patharghata"] },
    { region: "Barisal", district: "Jhalokati", lat: 22.6417, lon: 90.2167, areas: ["Nalchity", "Rajapur"] },
    { region: "Mymensingh", district: "Mymensingh", lat: 24.7539, lon: 90.3987, areas: ["Trishal", "Muktagachha"] },
    { region: "Mymensingh", district: "Netrokona", lat: 24.8833, lon: 90.7333, areas: ["Khaliajuri", "Mohanganj"] },
    { region: "Mymensingh", district: "Jamalpur", lat: 24.9167, lon: 89.9333, areas: ["Madarganj", "Islampur"] },
    { region: "Mymensingh", district: "Sherpur", lat: 25.0333, lon: 90.0333, areas: ["Nakla", "Nalitabari"] },
  ];

  const regions = ["all", "Dhaka", "Chattogram", "Sylhet", "Rangpur", "Khulna", "Rajshahi", "Barisal", "Mymensingh"];
  
  const regionColors = {
    Dhaka: "#3b82f6",
    Chattogram: "#10b981",
    Sylhet: "#8b5cf6",
    Rangpur: "#f59e0b",
    Khulna: "#ec4899",
    Rajshahi: "#14b8a6",
    Barisal: "#f97316",
    Mymensingh: "#6366f1"
  };

  // Convert lat/lon to SVG coordinates
  const latToY = (lat) => ((26.5 - lat) / (26.5 - 20.5)) * 400;
  const lonToX = (lon) => ((lon - 87.5) / (93 - 87.5)) * 500;

  const filteredData = selectedRegion === "all" 
    ? coverageData 
    : coverageData.filter(d => d.region === selectedRegion);

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            🚚 Nationwide Delivery Coverage
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We deliver books to <span className="font-semibold text-blue-600">{coverageData.length} districts</span> across all 8 divisions of Bangladesh
          </p>
        </div>

        {/* Region Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 text-white">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedRegion === region
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {region === "all" ? "All Regions" : region}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <svg viewBox="0 0 500 400" className="w-full h-auto">
                {/* Bangladesh border */}
                <rect x="0" y="0" width="500" height="400" fill="#f0f9ff" />
                
                {/* District markers */}
                {filteredData.map((district, idx) => {
                  const x = lonToX(district.lon);
                  const y = latToY(district.lat);
                  const isHovered = hoveredDistrict === idx;
                  
                  return (
                    <g key={idx}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? "10" : "7"}
                        fill={regionColors[district.region]}
                        opacity={isHovered ? "1" : "0.8"}
                        className="transition-all duration-200 cursor-pointer"
                        onMouseEnter={() => setHoveredDistrict(idx)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                      />
                      
                      {isHovered && (
                        <g>
                          <rect
                            x={x - 60}
                            y={y - 70}
                            width="120"
                            height="55"
                            fill="rgba(0,0,0,0.9)"
                            rx="6"
                          />
                          <text
                            x={x}
                            y={y - 48}
                            textAnchor="middle"
                            fill="white"
                            fontSize="13"
                            fontWeight="700"
                          >
                            {district.district}
                          </text>
                          <text
                            x={x}
                            y={y - 32}
                            textAnchor="middle"
                            fill="#93c5fd"
                            fontSize="10"
                          >
                            {district.region}
                          </text>
                          <text
                            x={x}
                            y={y - 20}
                            textAnchor="middle"
                            fill="#d1d5db"
                            fontSize="9"
                          >
                            {district.areas.slice(0, 2).join(", ")}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              <div className="mt-6 flex flex-wrap gap-3 justify-center text-xs">
                {Object.entries(regionColors).map(([region, color]) => (
                  <div key={region} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                    <span className="text-gray-600">{region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats & Info */}
          <div className="space-y-6">
            
            {/* Stats Cards */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-8 h-8" />
                <div>
                  <div className="text-3xl font-bold">{filteredData.length}</div>
                  <div className="text-blue-100 text-sm">Districts Covered</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Coverage Highlights
              </h3>
              <div className="space-y-3">
                {regions.slice(1).map(region => {
                  const count = coverageData.filter(d => d.region === region).length;
                  return (
                    <div key={region} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{region}</span>
                      <span className="font-semibold text-gray-900">{count} districts</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-green-900 mb-1">Fast Delivery</p>
                  <p className="text-green-700">3-5 business days to most locations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* District List */}
        <div className="mt-12 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6">
            {selectedRegion === "all" ? "All Districts" : `${selectedRegion} Division`}
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredData.map((district, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-100 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                style={{ borderLeftColor: regionColors[district.region], borderLeftWidth: "3px" }}
                onMouseEnter={() => setHoveredDistrict(idx)}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <div className="font-semibold text-gray-900 mb-1">{district.district}</div>
                <div className="text-xs text-gray-500 mb-2">{district.region}</div>
                <div className="text-xs text-gray-600">
                  {district.areas.slice(0, 2).join(", ")}
                  {district.areas.length > 2 && ` +${district.areas.length - 2}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;