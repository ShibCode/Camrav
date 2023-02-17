export default async function postRequest(url, data) {
  const responseJson = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await responseJson.json();

  return response;
}
