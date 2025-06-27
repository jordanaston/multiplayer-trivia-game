"use client";

import Pusher from "pusher-js";

export const pusher = new Pusher("373ca3b493b11081873a", {
  cluster: "ap4",
});
