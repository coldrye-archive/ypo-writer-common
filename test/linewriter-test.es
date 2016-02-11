// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2015-2016 Carsten Klein
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import assert from 'esaver';

import LineWriter from '../src/linewriter';

import {DummyStream} from './util';


describe('LineWriter',
function ()
{
    describe('constructor',
    function ()
    {
        const stream = new DummyStream();

        it('must fail on missing stream',
        function ()
        {
            assert.throws(
            function ()
            {
                new LineWriter();
            }, TypeError);
        });

        it('must fail on invalid stream',
        function ()
        {
            assert.throws(
            function ()
            {
                new LineWriter(new Object());
            }, TypeError);
        });

        it('must not fail on missing encoding',
        function ()
        {
            assert.doesNotThrow(
            function ()
            {
                new LineWriter(stream, {eol:'\r'});
            });
        });

        it('must fail on empty string encoding',
        function ()
        {
            assert.throws(
            function ()
            {
                new LineWriter(stream, {encoding:''});
            }, TypeError);
        });

        it('must not fail on missing eol',
        function ()
        {
            assert.doesNotThrow(
            function ()
            {
                new LineWriter(stream, {encoding:'ascii'});
            });
        });

        it('must fail on empty string eol',
        function ()
        {
            assert.throws(
            function ()
            {
                new LineWriter(stream, {eol:''});
            }, TypeError);
        });
    });

    const cut = new LineWriter(new DummyStream());

    it('#encoding must return default',
    function ()
    {
        assert.equal(cut.encoding, 'utf-8');
    });

    it('#eol must return default',
    function ()
    {
        assert.equal(cut.eol, '\n');
    });

    describe('#write()',
    function ()
    {
        const stream = new DummyStream('ascii', '\r\n', '');
        const cut = new LineWriter(
            stream, {encoding:'ascii', eol:'\r\n'}
        );

        it('#write() must not fail on missing data',
        function ()
        {
            assert.expect(3);
            cut.write();
        });

        it('#close() must close the underlying stream as expected',
        function ()
        {
            assert.expect(1);
            cut.close();
        });

        const stream2 = new DummyStream('ascii', '\r\n', 'data');
        const cut2 = new LineWriter(
            stream2, {encoding:'ascii', eol:'\r\n'}
        );

        it('#write() must not fail on provided data',
        function ()
        {
            assert.expect(3);
            cut2.write('data');
        });
    });
});

