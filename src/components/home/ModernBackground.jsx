import React from 'react';

const ModernBackground = () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e5e9f2] via-[#f8fafc] to-[#e0e7ef]">
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/pw-maze-white.png")`,
          backgroundRepeat: "repeat"
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-[#1e40af]/5 to-[#4b5563]/10" />
    </div>
  );

  export default ModernBackground;