#!/usr/bin/perl

use strict;
use warnings;

my @term = [];
my $x = 0;
my $entry = '';
my $subj = '';
my $temp = '';
my $see = '';
my $use = '';
my $code = '';
my $termno = 0;

open my $indexfile, '<', 'E-Index.xml';
my @icdfile = <$indexfile>;
close $indexfile;

local $/ = undef;
$/ = "\n";

my $outputfile = 'external.js';

open (OUTFILE, '>:utf8',$outputfile);

foreach $entry(@icdfile) {
	if ($entry =~ m/<mainTerm>.*<title>([^<]*)</) {
		$term[0] = $1;
		$termno = 0;
		$subj = ''
		}
	if ($entry =~ m/<term level="([0-9])">.*<title>([^<]*)</) {
		$termno = $1;
		$term[$termno] = $2;
		}
	if ($entry =~ m/<term level="([0-9])">.*<see>([^<]*)</) {
                $use = $2;
                $temp = '';
                if ($termno == 0) {$termno = 1;}
                for ($x = 0; $x <= $termno; $x++) {
                        $temp .= ' > ' . $term[$x];
                        }
                $temp =~ s/^ > //;
                print OUTFILE "<t>$temp</t> <see>$use</see>@";
                }
	if ($entry =~ m/<term level="([0-9])">.*<sa>([^<]*)</) {
                $use = $2;
                $temp = '';
                if ($termno == 0) {$termno = 1;}
                for ($x = 0; $x <= $termno; $x++) {
                        $temp .= ' > ' . $term[$x];
                        }
                $temp =~ s/^ > //;
                print OUTFILE "<t>$temp</t> <sa>$use</sa>@";
                }
	if ($entry =~ m/<code>(.*)</) {
		$code = $1;

		for ($x = 0; $x <= $termno; $x++) {
			$subj .= ' > ' . $term[$x];	
			}
		$subj =~ s/^ > //;
		print OUTFILE "<c>$code</c><t>$subj</t>@";	
		$subj = '';
		}
	}
