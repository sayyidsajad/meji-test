import { useEffect, useState } from "react";
import extractUppercase from "../utility/upperCase";


    
function Details({ user, setopen, setData }) {
  const [client, setClient] = useState();

  useEffect(() => {
    setClient(user);
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((prev) =>
      prev.map((u) => {
        if (client.id === u.id) {
          return client;
        }
        return u;
      })
    );
    setopen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="lg:m-4 p-6 items-center">
            <p className="text-xl font-bold mb-4">
              User Details @{client && client.username}
            </p>
            <img
              src={
                client &&
                `https://placehold.co/600x400/2563EB/FFF?text=${extractUppercase(
                  client.name
                )}`
              }
              alt="User"
              className="h-40 w-40 object-cover"
            />
          </div>

          <div className="lg:m-4">
            <div className="relative space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6">
              <div>
                <label className="block text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  value={client && client.name}
                  placeholder="Your Name"
                  className="mt-1 h-12 w-full rounded-md bg-gray-100 px-3"
                  onChange={(e) =>
                    setClient((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">
                  Email Address
                </label>
                <input
                  type="text"
                  value={client && client.email}
                  placeholder="Your Email"
                  className="mt-1 h-12 w-full rounded-md bg-gray-100 px-3"
                  onChange={(e) =>
                    setClient((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Username</label>
                <input
                  type="text"
                  value={client && client.username}
                  placeholder="Your Username"
                  className="mt-1 h-12 w-full rounded-md bg-gray-100 px-3"
                  onChange={(e) =>
                    setClient((prev) => ({ ...prev, username: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Address</label>
                <textarea
                  placeholder="Your Address"
                  rows="4"
                  className="mt-1 h-20 w-full rounded-md bg-gray-100 px-3"
                  onChange={(e) =>
                    setClient((prev) => ({ ...prev, address: e.target.value }))
                  }
                >
                  {client &&
                    `${client.address.street}, ${client.address.suite}, ${client.address.city}, ${client.address.zipcode}`}
                </textarea>
              </div>
            </div>
          </div>

          <div className="lg:m-4">
            <div className=" relative space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6">
              <div>
                <label className="block text-sm text-gray-600">Company</label>
                <input
                  type="text"
                  placeholder="Your Company"
                  className="mt-1 h-12 w-full rounded-md bg-gray-100 px-3"
                  value={client && client.company.name}
                  onChange={(e) =>
                    setClient((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Industry</label>
                <input
                  type="text"
                  placeholder="Your Industry"
                  className="mt-1 h-12 w-full rounded-md bg-gray-100 px-3"
                  value={client && client.company.bs}
                  onChange={(e) =>
                    setClient((prev) => ({ ...prev, industry: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">
                  Catch Phrase
                </label>
                <textarea
                  placeholder="Your Catch Phrase"
                  rows="4"
                  className="mt-1 h-20 w-full rounded-md bg-gray-100 px-3"
                  value={client && client.company.catchPhrase}
                  onChange={(e) =>
                    setClient((prev) => ({
                      ...prev,
                      catchPhase: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    
  );
}
export default Details;
