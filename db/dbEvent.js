const DBEvent = {
  createEvent: async ({
    name,
    description,
    location,
    phone,
    startDate,
    endDate,
    host,
    type,
  }) => {
    const data = {
      name,
      description,
      location,
      phone,
      startDate,
      endDate,
      host,
      type,
      uid: 12,
    };

    return data;
  },
};

export default DBEvent;
