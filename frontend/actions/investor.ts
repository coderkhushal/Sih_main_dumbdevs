const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getStartups = async (industry: string) => {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const fetchStartup = fetch(
      `${BASE_URL}/investor/showStartups?page=1&industry=${industry}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    const data = await fetchStartup;
    if (data) {
      return data;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMeetings = async () => {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const fetchStartup = fetch(`${BASE_URL}/investor/getMeetings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    const data = await fetchStartup;
    if (data) {
      return data;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const CreateMeating = async ({
  startupId,
  duration,
  date,
}: {
  startupId: number;
  duration: number;
  date: string;
}) => {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(startupId, duration, date, "IDD");

  try {
    const fetchStartup = fetch(`${BASE_URL}/investor/createMeetingRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ startupId, datetime: date, duration }),
    }).then((res) => res.json());

    const data = await fetchStartup;
    console.log(data);
    if (data) {
      return data;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getRequestedMeetings = async () => {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const fetchStartup = fetch(`${BASE_URL}/investor/getMeetingRequests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    const data = await fetchStartup;
    if (data) {
      return data;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getInvestments = async () => {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const fetchInvestment = fetch(`${BASE_URL}/investor/investments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    const data = await fetchInvestment;
    if (data) {
      return data;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const DeleteMeeting = async (
MeetId:number
) => {
  const token = localStorage.getItem("token");
  console.log(MeetId, "IDD");

  try {
    const delReq = fetch(`${BASE_URL}/investor/deleteMeetingRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ meetingRequestId:MeetId }),
    }).then((res) => res.json());

    const data = await delReq;
    console.log(data);
    if (data) {
      return data;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
