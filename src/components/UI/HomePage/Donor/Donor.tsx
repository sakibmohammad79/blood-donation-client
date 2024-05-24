const Donor = async () => {
  const res = await fetch("http://localhost:5000/api/v1/donor", {
    next: {
      revalidate: 30,
    },
  });

  const { data: allDonor } = await res.json();
  console.log(allDonor);
  return (
    <div>
      <h2>This is Donor component</h2>
    </div>
  );
};

export default Donor;
