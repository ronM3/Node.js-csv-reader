const creatingCsv = (data, csv, path, newpath, fileName) => {
  const rows = [
    ["id", "firstName", "lastName"],
    [data.id, data.first_name, data.last_name],
  ];
  return csv.writeToPath(path.resolve(newpath, `${fileName}.csv`), rows)
    .on("error", (err) => console.error(err))
    .on("finish", () => console.log("Done writing. " + rows));
};

module.exports = creatingCsv;
