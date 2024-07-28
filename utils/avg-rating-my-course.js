export const avgRatingMyCourse = (testimonials) => {
  // console.log("tst", testimonials);

  let sum = 0;
  if (testimonials) {
    for (const testimonial of testimonials) {
      sum += testimonial?.Rating;
    }
  } else {
    return 0;
  }

  return testimonials?.length > 0 ? sum / testimonials.length : 0;
};
