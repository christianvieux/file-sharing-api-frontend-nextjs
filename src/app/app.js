import "./app.css";
import Navbar from "./components/Navbar";

export default function MyApp({ children }) {
  return (
    <html lang="en">
      <body className="">
        <div id="App">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
