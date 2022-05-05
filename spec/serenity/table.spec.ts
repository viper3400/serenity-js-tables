import { contain, containAtLeastOneItemThat, Ensure, equals, includes } from '@serenity-js/assertions';
import { actorCalled, Log } from '@serenity-js/core';
import { By, Navigate, PageElement, PageElements, Text} from '@serenity-js/web';
import { describe, it } from 'mocha';



const TableRows = () => PageElements.located(By.css('[data-test="custom-row"]')).describedAs('all table rows');
const TableRowByIndex = (rowIndex: number) => TableRows().get(rowIndex);

const TableColumns = () => PageElements.located(By.css('[data-test="custom-column"]')).describedAs('all table columns');
const TableColumsOfRowByIndex = (rowIndex: number) => TableColumns().of(TableRowByIndex(rowIndex));

const LifeformColumnInRow = (rowIndex: number) => TableColumsOfRowByIndex(rowIndex).get(0).describedAs(`the lifeform column in row ${rowIndex}`);
const TypeColumnInRow = (rowIndex: number) => TableColumsOfRowByIndex(rowIndex).get(1).describedAs(`the type column in row ${rowIndex}`);
const NameColumnInRow = (rowIndex: number) => TableColumsOfRowByIndex(rowIndex).get(2).describedAs(`the name column in row ${rowIndex}`);
const AgeColumnInRow = (rowIndex: number) => TableColumsOfRowByIndex(rowIndex).get(3).describedAs(`the age column in row ${rowIndex}`);


const TableColumn = () => PageElement.located(By.css('[data-test="custom-column"]')).describedAs('a table column');

describe('Serenity/JS operates with a table', () => {

    it(`checks column text for a given table by a known index`, () =>
        actorCalled('Alice').attemptsTo(
            Navigate.to('http://localhost:3000'),
            Ensure.that(Text.of(LifeformColumnInRow(1)), equals('Animal')),
            Ensure.that(Text.of(TypeColumnInRow(1)), equals('Cat')),
            Ensure.that(Text.of(NameColumnInRow(1)), equals('Pinky')),
            Ensure.that(Text.of(AgeColumnInRow(1)), equals('11 years'))
        ));

    it(`checks existense of a full row by known text in the columns`, () =>
        actorCalled('Alice').attemptsTo(
            Navigate.to('http://localhost:3000'),
            Log.the(Text.ofAll(
                TableRows()
                .where(Text.of(TableColumn()), equals('Animal'))
                )
            ),
            Log.the(Text.ofAll(
                TableRows()
                .where(Text.of(TableColumn()), equals('Plant'))
                )
            ),
            Log.the(Text.ofAll(
                TableRows()
                .where(Text.ofAll(TableColumns()), contain('Cat'))
                )
            ),
            Log.the(Text.ofAll(
                TableRows()
                .where(Text.ofAll(TableColumns()), contain('Animal'))
                .where(Text.ofAll(TableColumns()), contain('Cat'))
                .where(Text.ofAll(TableColumns()), contain('Pinky'))
                .where(Text.ofAll(TableColumns()), contain('11 years'))
                )
            )
        ));
});
