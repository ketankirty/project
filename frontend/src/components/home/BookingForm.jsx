import React, { useState } from 'react';
import { Calendar, MapPin, Search, Users } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [budget, setBudget] = useState('any');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!destination || !startDate || !endDate || !guests || !budget) {
      alert('Please fill all the fields!!');
      return;
    }

    setLoader(true);

    try {
      const response = await axios.post('http://localhost:8000/api/enquiryform/enquiry',
        {
          destination,
          startDate,
          endDate,
          guests,
          budget,
        }
      );

      console.log('Data saved', response.data);

      setTimeout(() => {
        setLoader(false);
        navigate('/destinations');
      }, 1000);

      setDestination('');
      setStartDate('');
      setEndDate('');
      setGuests(1); // reset to default
      setBudget('any');
    }

    catch (error) {
      console.error(error);
      setLoader(false);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-heading font-semibold mb-6">
        Find Your Perfect Trip
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {/* Destination */}
          <div className="md:col-span-1">
            <label htmlFor="destination" className="label">
              Destination
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-500" />
              </div>
              <select
                id="destination"
                value={destination}
                name="destination"
                onChange={(e) => setDestination(e.target.value)}
                className="input pl-10 appearance-none bg-white"
                required
              >
                <option value="">Select Destination</option>
                <option value="andhra-pradesh">Andhra Pradesh</option>
                <option value="arunachal-pradesh">Arunachal Pradesh</option>
                <option value="assam">Assam</option>
                <option value="bihar">Bihar</option>
                <option value="chhattisgarh">Chhattisgarh</option>
                <option value="goa">Goa</option>
                <option value="gujarat">Gujarat</option>
                <option value="haryana">Haryana</option>
                <option value="himachal-pradesh">Himachal Pradesh</option>
                <option value="jharkhand">Jharkhand</option>
                <option value="karnataka">Karnataka</option>
                <option value="kerala">Kerala</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="manipur">Manipur</option>
                <option value="meghalaya">Meghalaya</option>
                <option value="mizoram">Mizoram</option>
                <option value="nagaland">Nagaland</option>
                <option value="odisha">Odisha</option>
                <option value="punjab">Punjab</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="sikkim">Sikkim</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="telangana">Telangana</option>
                <option value="tripura">Tripura</option>
                <option value="uttar-pradesh">Uttar Pradesh</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="west-bengal">West Bengal</option>
                <option value="andaman-nicobar">Andaman & Nicobar Islands</option>
                <option value="chandigarh">Chandigarh</option>
                <option value="dadra-nagar-haveli-daman-diu">Dadra & Nagar Haveli and Daman & Diu</option>
                <option value="delhi">Delhi (NCT)</option>
                <option value="jammu-kashmir">Jammu & Kashmir</option>
                <option value="ladakh">Ladakh</option>
                <option value="lakshadweep">Lakshadweep</option>
                <option value="puducherry">Puducherry</option>

              </select>
            </div>
          </div>

          {/* Check-in date */}
          <div>
            <label htmlFor="startDate" className="label">
              Check-in Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-500" />
              </div>
              <input
                id="startDate"
                type="date"
                value={startDate}
                name="startdate"
                onChange={(e) => setStartDate(e.target.value)}
                className="input pl-10"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Check-out date */}
          <div>
            <label htmlFor="endDate" className="label">
              Check-out Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-500" />
              </div>
              <input
                id="endDate"
                type="date"
                name="enddate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input pl-10"
                required
                min={startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="guests" className="label">
              Guests
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users size={18} className="text-gray-500" />
              </div>
              <select
                id="guests"
                value={guests}
                name="guests"
                onChange={(e) => setGuests(Number(e.target.value))}
                className="input pl-10 appearance-none bg-white"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5 Guests</option>
                <option value={6}>6+ Guests</option>
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="label">
              Budget Range
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <select
                id="budget"
                value={budget}
                name="budget"
                onChange={(e) => setBudget(e.target.value)}
                className="input pl-10 appearance-none bg-white"
              >
                <option value="any">Any Budget</option>
                <option value="economy">Economy (Under ₹10,000)</option>
                <option value="standard">Standard (₹10,000 - ₹30,000)</option>
                <option value="premium">Premium (₹30,000 - ₹50,000)</option>
                <option value="luxury">Luxury (₹50,000+)</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary py-3 w-full md:w-auto px-8 flex items-center justify-center"
          disabled={loader}
        >
          {loader ? (
            <span>Loading...</span>
          ) : (
            <>
              <Search size={18} className="mr-2" />
              Search Trips
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
