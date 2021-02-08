export function formatData(data) {
  let formatedData = [];

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'key' && key !== 'risk') {
      formatedData.push({name: key, value: value})
    }
  }

  return formatedData;
}
