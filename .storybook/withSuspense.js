import React, { Suspense } from "react";

export default (storyFn) => <Suspense fallback={null}>{storyFn()}</Suspense>;
