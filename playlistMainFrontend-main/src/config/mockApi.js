// src/config/mockApi.js
export const apiFetch = async (url, options) => {
  console.log(`Mock API call to: ${url}`);

  // Simulate delay
  await new Promise(r => setTimeout(r, 200));

  if (url.includes("/validateUser")) {
    return { ok: true, json: async () => ({ employeeId: 1, fullName: "Janvi", email: "janvi.patel6@tcs.com" }) };
  }

  if (url.includes("/getReservations")) {
    return {
      ok: true,
      json: async () => ({
        reservations: [
          { id: 1, type: "Workshop", title: "React Workshop", date: "2026-06-01" },
          { id: 2, type: "Hackathon", title: "Hackathon 101", date: "2026-06-05" }
        ]
      })
    };
  }

  if (url.includes("/getFeedback")) {
    return {
      ok: true,
      json: async () => ({
        feedbacks: [
          { id: 1, event: "Workshop", rating: 5, comments: "Very helpful!" },
          { id: 2, event: "Hackathon", rating: 4, comments: "Fun experience." }
        ]
      })
    };
  }

  if (url.includes("/getAdminData")) {
    return {
      ok: true,
      json: async () => ({
        totalReservations: 15,
        upcomingEvents: 5,
        users: [
          { id: 1, name: "Janvi", role: "employee" },
          { id: 2, name: "Ravin", role: "employee" }
        ]
      })
    };
  }

  if (url.includes("/getEventDetails")) {
    return {
      ok: true,
      json: async () => ({
        id: 1,
        title: "React Workshop",
        description: "Learn React basics",
        location: "Online",
        participants: 20
      })
    };
  }

  return { ok: true, json: async () => ({}) };
};


