const upsertSession = `  
  INSERT INTO sessions (empID, name, role, sessionID)  
  VALUES ($1, $2, $3, $4)  
  ON CONFLICT (sessionID)  
  DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, empID = EXCLUDED.empID;  
`;

const upsertDetails = `  
  INSERT INTO details (sessionID, bannerText, detailedText, imageUrl, videoUrl)  
  VALUES ($1, $2, $3, $4, $5)  
  ON CONFLICT (sessionID)  
  DO UPDATE SET bannerText = EXCLUDED.bannerText, detailedText = EXCLUDED.detailedText, imageUrl = EXCLUDED.imageUrl, videoUrl = EXCLUDED.videoUrl;  
`;

const upsertOverview = `  
  INSERT INTO overview (sessionID, name, category, duration, overviewText, imageUrl)  
  VALUES ($1, $2, $3, $4, $5, $6)  
  ON CONFLICT (sessionID)  
  DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, duration = EXCLUDED.duration, overviewText = EXCLUDED.overviewText, imageUrl = EXCLUDED.imageUrl;  
`;

const upsertEmployee = `  
    INSERT INTO employee (empID, empName, empRole)  
    VALUES ($1, $2, $3)  
    ON CONFLICT (empID)  
    DO UPDATE SET  
        empName = EXCLUDED.empName,  
        empRole = EXCLUDED.empRole`;

const insertSession = `
    INSERT INTO SESSIONS (sessionID, empID, SessionName, DetailedBannerText, DetailedText, DetailedImageUrl, DetailedVideoUrl, OverviewCategory, OverviewDuration, OverviewText, OverviewImageUrl)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
`;

module.exports = {
  upsertEmployee,
  insertSession,
};
