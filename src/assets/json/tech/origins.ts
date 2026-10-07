const _origins = {
  origins: [
    {
      title: "R2l6TW9kbw==",
      url: "aHR0cHM6Ly9naXptb2RvLmNvbS5icg==",
    },
    {
      title: "VGVjbm9ibG9n",
      url: "aHR0cHM6Ly90ZWNub2Jsb2cubmV0",
    },
    {
      title: "Q2FuYWxUZWNo",
      url: "aHR0cHM6Ly9jYW5hbHRlY2guY29tLmJy",
    },
    {
      title: "VW9sVGVjbm9sb2dpYQ==",
      url: "aHR0cHM6Ly93d3cudW9sLmNvbS5ici90aWx0",
    },
    {
      title: "T2xoYXJEaWdpdGFs",
      url: "aHR0cHM6Ly9vbGhhcmRpZ2l0YWwuY29tLmJy",
    },
    {
      title: "VGVjTXVuZG8=",
      url: "aHR0cHM6Ly93d3cudGVjbXVuZG8uY29tLmJy",
    },
    {
      title: "TGVhaw==",
      url: "aHR0cHM6Ly93d3cubGVhay5wdA==",
    },
    {
      title: "TWFpc1RlY25vbG9naWE=",
      url: "aHR0cHM6Ly93d3cubWFpc3RlY25vbG9naWEuY29t",
    },
    {
      title: "QWRyZW5hbGluZQ==",
      url: "aHR0cHM6Ly93d3cuYWRyZW5hbGluZS5jb20uYnI=",
    },
    {
      title: "RXhhbWVUZWNub2xvZ2lh",
      url: "aHR0cHM6Ly9leGFtZS5jb20=",
    },
    {
      title: "U2hvd01lVGVjaA==",
      url: "aHR0cHM6Ly93d3cuc2hvd21ldGVjaC5jb20uYnI=",
    },
    {
      title: "VHVkb0VtVGVjbm9sb2dpYQ==",
      url: "aHR0cHM6Ly90dWRvZW10ZWNub2xvZ2lhLmNvbQ==",
    },
    {
      title: "U2Fwb1Rlaw==",
      url: "aHR0cHM6Ly90ZWsuc2Fwby5wdA==",
    },
    {
      title: "NEdOZXdzUHQ=",
      url: "aHR0cHM6Ly80Z25ld3MucHQ=",
    },
    {
      title: "VGVjaFR1ZG8=",
      url: "aHR0cHM6Ly93d3cudGVjaHR1ZG8uY29tLmJy",
    },
  ],
  originsRemoved: [
    {
      title: "UHJvZmlzc2lvbmFpc1RJ",
      url: "aHR0cHM6Ly93d3cucHJvZmlzc2lvbmFpc3RpLmNvbS5icg==",
      at: "2026-04-10T00:00:00Z",
      reason: "site offline",
    },
    {
      title: "Q29jYVRlY2g=",
      url: "aHR0cHM6Ly9jb2NhdGVjaC5jb20uYnI=",
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
