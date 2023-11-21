export function filterPortabilityByDateRange(portabilityData, startDate, endDate) {
    if (!portabilityData) {
      return [];
    }
  
    return portabilityData.filter((portability) => {
      const portageDate = new Date(portability.pdate);
      return portageDate >= startDate && portageDate <= endDate;
    });
  }