"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, Chip, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [ip, setIp] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postal, setPostal] = useState("");
  const [org, setOrg] = useState("");
  const [time, setTime] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const Router = useRouter();

  useEffect(() => {
    axios
      .get("https://api.ipify.org/?format=json")
      .then((res) => setIp(res.data.ip))
      .then(() => {
        axios.get("https://ipapi.co/" + ip + "/json/").then((r) => {
          setCity(r.data.city);
          setState(r.data.region);
          setCountry(r.data.country);
          setOrg(r.data.org);
          setPostal(r.data.postal);
          setTime(r.data.timezone);
          setLat(r.data.latitude);
          setLong(r.data.longitude);
        });
      });
  }, []);

  return (
    <main className="flex h-screen flex-col items-center place-content-center place-items-center">
      <div className="flex place-content-center place-items-center">
        <div className="flex flex-col gap-5 text-center">
          {time ? (
            <>
              <h1 className="text-2xl font-extrabold text-white md:text-5xl lg:text-4xl">
                <span className="text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-300 from-red-500">
                  {ip}
                </span>
              </h1>
              <h1 className="text-2xl font-extrabold text-white md:text-5xl lg:text-4xl">
                <span className="text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-emerald-300">
                  {org}
                </span>
                <br></br>
              </h1>
              <p className="text-xl font-bold text-white md:text-3xl lg:text-3xl">
                {city}, {state}, {country}
              </p>
              <p className="text-lg font-semibold text-white md:text-2xl lg:text-2xl">
                <Chip variant="bordered" className="p-4 border-white">
                  {postal}
                </Chip>
                <br></br>
                <br></br>
                {time}
                <br></br>
                <br></br>
                {/* <Link
                  isBlock
                  color="warning"
                  onClick={() => {
                    Router.push(
                      "http://maps.google.com/maps?q=" + lat + "," + long
                    );
                  }}
                >
                  click here to locate yourself
                </Link> */}
              </p>
            </>
          ) : (
            <div className="md:w-96 lg:w-96 w-screen">
              <div className="w-full flex flex-col gap-1 items-center">
                <Skeleton className="h-12 w-3/5 md:w-10/12 md:h-16 rounded-3xl" />
                <br></br>
                <Skeleton className="h-8 w-5/6 md:w-11/12 md:h-14 rounded-3xl" />
                <br></br>
                <Skeleton className="h-6 w-3/4 md:h-9 rounded-3xl" />
                <br></br>
                <Skeleton className="h-6 w-2/5 rounded-3xl" />
                <br></br>
                <Skeleton className="h-6 w-2/5 rounded-3xl" />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
