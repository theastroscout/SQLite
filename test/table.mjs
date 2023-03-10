/*

Table Test

*/

let tableTest = async sql => {
	console.log('\n\n### Table Test ###\n');

	let test_table = sql.table('test_table');
	console.log('Table Object: ', test_table);

	console.log('Insert Data...');
	
	// Count
	let count = await test_table.count();
	console.log('Table\'s Documents Count is ', count);

	let ids = await test_table.insert({data: 'Some Data', extra: 'Extra Data 2'});
	console.log('Inserted IDs: ', ids)
	ids = await test_table.insert([
		{data: 'Some Data', extra: 'Some Extra Data 3'},
		{data: 'Some Data', extra: 'Some Extra Data 4'},
		{data: 'Some Data', extra: 'Some Extra Data 5'},
		{data: 'Some Data', extra: 'Some Extra Data 6'},
		{data: 'Some Data', extra: [1,2,3,4,5]},
		{data: 'Some Data', extra: {var1: true}}
	]);
	console.log('Inserted IDs: ', ids);

	/*

	Insert One

	*/

	let insertOneData = {data: 'Some Data', extra: [54,42]};
	let insertOneID = await test_table.insertOne(insertOneData);
	console.log('Insert One', insertOneData, insertOneID);

	/*

	Check Find In

	*/

	let extraData = ['Some Extra Data 3', 'Some Extra Data 4'];
	let inResult = await test_table.find({extra: {$in: extraData}});
	console.log('\nResult $in operator:', inResult, '\n');

	/*

	Check Date

	*/

	ids = await test_table.insert([
		{data: 'Some Data', extra: 'CURRENT_TIME'},
		{data: 'Some Data', extra: new Date()}
	]);
	console.log('Date Time IDs', ids);

	// Count
	count = await test_table.count();
	console.log('Table\'s Documents Count is ', count);

	let r = await test_table.find({data: 'Some Data'}, {fields: ['id', 'data', 'extra'], limit: 10});
	console.log('Find Result: ', r)
	
	let r2 = await test_table.find({data: 'Some Data'}, {fields: ['id', 'data', 'extra'], limit: 2, skip: 3});
	console.log('Find Result Limit 2, Skipped 3: ', r2)

	await test_table.each({data: 'Some Data'}, {fields: ['id', 'data', 'extra'], limit: 10}, (err, row) => {
		console.log('Each > Row:', row)
	});

	/*

	Update

	*/

	console.log('\n>>> Checking Update...\n');
	let resultID1 = await test_table.find({id: 1});
	console.log('Row #1:', resultID1);
	await test_table.update({id: 1}, {data: 'Updated New Data', extra: new Date()});
	resultID1 = await test_table.find({id: 1});
	console.log('Updated Row #1:', resultID1);


	/*

	Find nothing

	*/

	console.log('\n>>> Search Nothing...\n');
	let nothing = await test_table.find({id: 12838732});
	console.log('Nothing is: ',nothing);

	/*

	Find one

	*/
	let one = await test_table.findOne({data: 'Some Data'});
	console.log('\n\nFind one: ', one, '\n\n');
	

	console.log('\n\n### End Table Test ###\n');

	return [true, 'Table Test successfully'];
};

export default tableTest;