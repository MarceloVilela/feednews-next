const _origins = {
  origins: [
    {
      title: "R2l6TW9kbw==",
      url: "aHR0cHM6Ly9naXptb2RvLmNvbS5icg==",
      BIN_ID: "6092cecc92cb9267d0ce0dee",
    },
    {
      title: "VGVjbm9ibG9n",
      url: "aHR0cHM6Ly90ZWNub2Jsb2cubmV0",
      BIN_ID: "6092cc7c8a409667ca07659e",
    },
    {
      title: "Q2FuYWxUZWNo",
      url: "aHR0cHM6Ly9jYW5hbHRlY2guY29tLmJy",
      BIN_ID: "6092cedc92cb9267d0ce0dfb",
    },
    {
      title: "VW9sVGVjbm9sb2dpYQ==",
      url: "aHR0cHM6Ly93d3cudW9sLmNvbS5ici90aWx0",
      BIN_ID: "6092ceddd64cd16802ab541f",
    },
    {
      title: "T2xoYXJEaWdpdGFs",
      url: "aHR0cHM6Ly9vbGhhcmRpZ2l0YWwuY29tLmJy",
      BIN_ID: "6092cedf92cb9267d0ce0dfe",
    },
    {
      title: "VGVjTXVuZG8=",
      url: "aHR0cHM6Ly93d3cudGVjbXVuZG8uY29tLmJy",
      BIN_ID: "6092cedf92cb9267d0ce0dfe",
    },
    {
      title: "TGVhaw==",
      url: "aHR0cHM6Ly93d3cubGVhay5wdA==",
      BIN_ID: "6092ced6d64cd16802ab5418",
    },
    {
      title: "TWFpc1RlY25vbG9naWE=",
      url: "aHR0cHM6Ly93d3cubWFpc3RlY25vbG9naWEuY29t",
      BIN_ID: "6092ced78a409667ca07672e",
    },
    {
      title: "QWRyZW5hbGluZQ==",
      url: "aHR0cHM6Ly93d3cuYWRyZW5hbGluZS5jb20uYnI=",
      BIN_ID: "6092ced9d64cd16802ab541b",
    },
    {
      title: "RXhhbWVUZWNub2xvZ2lh",
      url: "aHR0cHM6Ly9leGFtZS5jb20=",
      BIN_ID: "6092cedb8a409667ca076735",
    },
    {
      title: "U2hvd01lVGVjaA==",
      url: "aHR0cHM6Ly93d3cuc2hvd21ldGVjaC5jb20uYnI=",
      BIN_ID: "6092ced38a409667ca076729",
    },
    {
      title: "VHVkb0VtVGVjbm9sb2dpYQ==",
      url: "aHR0cHM6Ly90dWRvZW10ZWNub2xvZ2lhLmNvbQ==",
      BIN_ID: "6092ced492cb9267d0ce0df4",
    },
    {
      title: "U2Fwb1Rlaw==",
      url: "aHR0cHM6Ly90ZWsuc2Fwby5wdA==",
      BIN_ID: "6092ced28a409667ca076726",
    },
    {
      title: "NEdOZXdzUHQ=",
      url: "aHR0cHM6Ly80Z25ld3MucHQ=",
      BIN_ID: "6092cec8d64cd16802ab540d",
    },
    {
      title: "VGVjaFR1ZG8=",
      url: "aHR0cHM6Ly93d3cudGVjaHR1ZG8uY29tLmJy",
      BIN_ID: "6092cece8a409667ca076723",
    },
  ],
  originsRemoved: [
    {
      title: "UHJvZmlzc2lvbmFpc1RJ",
      url: "aHR0cHM6Ly93d3cucHJvZmlzc2lvbmFpc3RpLmNvbS5icg==",
      BIN_ID: "6092cecfd64cd16802ab5412",
      at: "2026-04-10T00:00:00Z",
      reason: "site offline",
    },
    {
      title: "Q29jYVRlY2g=",
      url: "aHR0cHM6Ly9jb2NhdGVjaC5jb20uYnI=",
      BIN_ID: "6092ceda8a409667ca076733",
      at: "2026-06-22T00:00:00Z",
      reason: "site offline",
    },
  ],
};

export default {
  origins: _origins.origins.map((item) => ({
    ...item,
    title: atob(item.title),
    url: atob(item.url),
  })),
  originsRemoved: _origins.originsRemoved,
};
