const URL = import.meta.env.VITE_NPS_BACKEND_BASE_URL;

export const textToVoiceAPI_old = async (
  data: {
    text: string;
    languageCode: string;
  }
) => {
  const response = await fetch(`${URL}/api/textToSpeech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const textToVoiceAPI= async (
  data: {
    text: string;
    languageCode: string;
  }
) => {
  const response = await fetch(`${URL}/api/textToSpeech_v2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const pan = async (query:string,language_code: string ) => {
  const response = await fetch(`http://35.200.154.180:5001/ask-question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      language_code: language_code,
    },
    body: JSON.stringify({ question: query }),
  });
  return response.json();
};


