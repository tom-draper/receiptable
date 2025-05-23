import { useEffect } from "preact/hooks";

export default function PrintOnLoad() {
  useEffect(() => {
    const ascii = `
  ____  _____ ____ _____ ___ ____ _____  _    ____  _     _____ 
 |  _ \\| ____/ ___| ____|_ _|  _ \\_   _|/ \\  | __ )| |   | ____|
 | |_) |  _|| |   |  _|  | || |_) || | / _ \\ |  _ \\| |   |  _|  
 |  _ <| |__| |___| |___ | ||  __/ | |/ ___ \\| |_) | |___| |___ 
 |_| \\_\\_____\\____|_____|___|_| _  |_/_/   \\_\\____/|_____|_____|
    / \\  |  _ \\_ _|      __   _/ |                              
   / _ \\ | |_) | |       \\ \\ / / |                              
  / ___ \\|  __/| |        \\ V /| |                              
 /_/   \\_\\_|  |___|        \\_/ |_|                              
                                                                `;

    console.log("%c" + ascii, "color: beige; font-weight: bold; font-family: monospace;");
  }, []);

  return null;
}