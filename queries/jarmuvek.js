
function osszesJarmu(db, callback) {
    const sql = `
        SELECT j.*, t.nev AS tulajdonos_nev
        FROM jarmuvek j
        JOIN tulajdonosok t
        ON j.tulajdonos_id = t.id
        ORDER BY j.javitasi_koltseg ASC
    `;

    db.query(sql, callback);
}

function keszJarmuvek(db, callback) {
    const sql = `
        SELECT *
        FROM jarmuvek
        WHERE kesz_van = 1
        AND javitasi_koltseg <= 80000
    `;

    db.query(sql, callback);
}

function jarmuKereses(db, szoveg, callback) {
    const sql = `
        SELECT *
        FROM jarmuvek
        WHERE LOWER(modell) LIKE LOWER(?)
    `;

    db.query(sql, [`%${szoveg}%`], callback);
}

module.exports = {
    osszesJarmu,
    keszJarmuvek,
    jarmuKereses
};
