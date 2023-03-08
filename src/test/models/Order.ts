export const createOrderBody = {
  user: {
    id: 1,
  },
  unregistered_client: {
    name: "Best copy d.o.o.",
  },
  unregistered_printers: [
    {
      model: "Konica Minolta C224e",
      serial_number: "AAJP902374",
    },
  ]
};

export const invalidCreateOrderBody = {
  user: {
    id: 1,
  },
  client:{
    id: 2
  },
  unregistered_client: {
    name: "Best copy d.o.o.",
  },
  unregistered_printers: [
    {
      printer:{
        model: "Konica Minolta C224e",
        serial_number: "AAJP902374",
      }
    },
  ]
};

export const updateOrderBody = {
  id: 2,
  work_details: "Zamjena toner cartridgea..",
  closed_at: "2022-08-07T00:00:00.000Z",
  status: {
    id: 2,
    name: "Otvoren",
  },
  material: [
    {
      id: 3,
      details: "-",
      amount: 10,
      material: {
        id: 1,
        name: "Gumice Konica/Ineo",
        type: {
          id: 2,
          name: "Dijelovi",
        },
      },
    },
    {
      id: 4,
      details: "-",
      amount: 3,
      material: {
        id: 2,
        name: "Gumice Canon",
        type: {
          id: 2,
          name: "Dijelovi",
        },
      },
    },
  ],
  printers: [
    {
      printer: {
        id: 3,
      },
      counter: {
        id: 2,
        created_at: "2022-08-07T00:00:00.000Z",
        bw_prints: 5086,
        color_prints: 35012,
        scans: null,
      },
      material: [],
    },
  ],
  unregistered_printers: [
    {
      printer: {
        model: "Konica Minolta C224e",
        serial_number: "AAJPW23543",
      },
    },
  ],
};
