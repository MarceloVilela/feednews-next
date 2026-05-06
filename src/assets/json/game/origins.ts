const _origins = {
  origins: [
    {
      title: "R2FtZVZpY2lv",
      url: "aHR0cHM6Ly93d3cuZ2FtZXZpY2lvLmNvbQ==",
    },
    {
      title: "Q29tYm9JbmZpbml0bw==",
      url: "aHR0cHM6Ly93d3cuY29tYm9pbmZpbml0by5jb20uYnIvcHJpbmNpcGFs",
    },
    {
      title: "Rmxvd0dhbWVz",
      url: "aHR0cHM6Ly9mbG93Z2FtZXMuZ2c=",
    },
    {
      title: "SWduQnI=",
      url: "aHR0cHM6Ly9ici5pZ24uY29t",
    },
    {
      title: "QWRyZW5hbGluZS1nYW1lcw==",
      url: "aHR0cHM6Ly93d3cuYWRyZW5hbGluZS5jb20uYnIvZ2FtZXM=",
    },
    {
      title: "U3RhcnRVT0w=",
      url: "aHR0cHM6Ly93d3cudW9sLmNvbS5ici9zdGFydA==",
    },
    {
      title: "VGVjaFR1ZG8tZXNwb3J0cw==",
      url: "aHR0cHM6Ly93d3cudGVjaHR1ZG8uY29tLmJyL2Utc3BvcnRz",
    },
    {
      title: "VGVjaFR1ZG8tam9nb3M=",
      url: "aHR0cHM6Ly93d3cudGVjaHR1ZG8uY29tLmJyL2pvZ29z",
    },
    {
      title: "Vm94ZWw=",
      url: "aHR0cHM6Ly93d3cudGVjbXVuZG8uY29tLmJyL3ZveGVs",
    },
    {
      title: "Q3JpdGljYWxIaXRz",
      url: "aHR0cHM6Ly9jcml0aWNhbGhpdHMuY29tLmJy",
    },
    {
      title: "R2xvYm9Fc3BvcnRlLWVzcG9ydHM=",
      url: "aHR0cHM6Ly9nZS5nbG9iby5jb20vZXNwb3J0cw==",
    },
    {
      title: "RzEtZ2FtZXM=",
      url: "aHR0cHM6Ly9nMS5nbG9iby5jb20vcG9wLWFydGUvZ2FtZXM=",
    },
    {
      title: "Sm92ZW1OZXJk",
      url: "aHR0cHM6Ly9qb3ZlbW5lcmQuY29tLmJy",
    },
    {
      title: "RHVzdDJCUg==",
      url: "aHR0cHM6Ly93d3cuZHVzdDIuY29tLmJy",
    },
    {
      title: "R2FtZUJsYXN0",
      url: "aHR0cHM6Ly93d3cuZ2FtZWJsYXN0LmNvbS5icg==",
    },
    {
      title: "R2FtZUhhbGw=",
      url: "aHR0cHM6Ly9nYW1laGFsbC5jb20uYnI=",
    },
    {
      title: "QXJrYWRl",
      url: "aHR0cHM6Ly93d3cuYXJrYWRlLmNvbS5icg==",
    },
    {
      title: "RHJhZnQ1",
      url: "aHR0cHM6Ly9kcmFmdDUuZ2c=",
    },
    {
      title: "TGFuY2UtZXNwb3J0cw==",
      url: "aHR0cHM6Ly93d3cubGFuY2UuY29tLmJyL2VzcG9ydHM=",
    },
    {
      title: "TWFpc0VzcG9ydHM=",
      url: "aHR0cHM6Ly9tYWlzZXNwb3J0cy5jb20uYnI=",
    },
    {
      title: "TUdHLU1pbGxlbml1bQ==",
      url: "aHR0cHM6Ly9ici5taWxsZW5pdW0uZ2c=",
    },
    {
      title: "T3ZlcmxvYWRy",
      url: "aHR0cHM6Ly93d3cub3ZlcmxvYWRyLmNvbS5icg==",
    },
    {
      title: "VGhlQ2x1dGNo",
      url: "aHR0cHM6Ly90aGVjbHV0Y2guY29tLmJy",
    },
    {
      title: "VGhlR2FtZVRpbWVz",
      url: "aHR0cHM6Ly9nYW1ldGltZXMuY29tLmJy",
    },
    {
      title: "TWV1UGxheXN0YXRpb24=",
      url: "aHR0cHM6Ly9tZXVwcy5jb20uYnI=",
    },
    {
      title: "UFNYLUJyYXNpbA==",
      url: "aHR0cHM6Ly9wc3hicmFzaWwuY29tLmJyLw==",
    },
    {
      title: "VW5pdmVyc29OaW50ZW5kbw==",
      url: "aHR0cHM6Ly91bml2ZXJzb25pbnRlbmRvLmNvbQ==",
    },
    {
      title: "TmludGVuZG9CbGFzdA==",
      url: "aHR0cHM6Ly93d3cubmludGVuZG9ibGFzdC5jb20uYnI=",
    },
    {
      title: "UG9ydGFsVmljaWFkb3M=",
      url: "aHR0cHM6Ly92aWNpYWRvcy5uZXQ=",
    },
    {
      title: "WGJveFdpcmU=",
      url: "aHR0cHM6Ly9uZXdzLnhib3guY29tL3B0LWJy",
    },
    {
      title: "V2luZG93c0NsdWI=",
      url: "aHR0cHM6Ly93aW5kb3dzY2x1Yi5jb20uYnI=",
    },
    {
      title: "WGJveFBvd2Vy",
      url: "aHR0cHM6Ly93d3cueGJveHBvd2VyLmNvbS5icg==",
    },
  ],
  originsRemoved: [
    {
      title: "VGhlRW5lbXk=",
      url: "aHR0cHM6Ly93d3cudGhlZW5lbXkuY29tLmJy",
      at: "2026-04-10T00:00:00Z",
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
